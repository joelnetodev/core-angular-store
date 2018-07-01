using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.DataBase.UnitOfWork;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private IProductRepository _prodRepository;
        private IOrderRepository _orderRepository;

        public OrdersController(IProductRepository prodRepo, IOrderRepository orderRepository)
        {
            _prodRepository = prodRepo;
            _orderRepository = orderRepository;
        }

        [HttpGet()]
        public IActionResult Get([FromQuery]int? clientId, [FromQuery]DateTime? startDate, [FromQuery]DateTime? endDate)
        {
            var orders = _orderRepository.FindByClientAndDates(clientId, startDate, endDate);

            return Ok(CreateOrders(orders, false));
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var order = _orderRepository.GetById(id);

            if (order == null)
            {
                throw new ErrorException(string.Format("Order {0} not found.", id));
            }

            return Ok(CreateOrder(order));
        }

        //[HttpPost]
        //public IActionResult Save([FromBody]ProductModel model)
        //{
        //    if (!ModelState.IsValid || string.IsNullOrEmpty(model.Name) || model.Price == 0)
        //    {
        //        throw new ErrorException("Product has missing fields.");
        //    }

        //    if (model.Items.Any(x => x.Id == 0))
        //    {
        //        throw new ErrorException("Product has unselected items.");
        //    }

        //    if (model.Items.GroupBy(x => x.Id).Any(v => v.Count() > 1))
        //    {
        //        throw new ErrorException("Product can not have the same item more than once.");
        //    }

        //    using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
        //    {
        //        var prod = CreateProduct(model);
        //        _prodRepository.SaveOrUpdate(prod);
        //        unit.Commit();
        //    }

        //    return Ok();
        //}

        //[Authorize(Roles = "Admin")]
        //[HttpPost("Delete/{id}")]
        //public IActionResult Delete(int id)
        //{
        //    using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
        //    {
        //        var prod = _prodRepository.GetById(id);
        //        if (prod != null)
        //        {
        //            _prodRepository.Delete(prod);
        //            unit.Commit();
        //        }
        //        else
        //        {
        //            throw new ErrorException("Product not found.");
        //        }

        //        return Ok();
        //    }
        //}


        #region helpers
        private Product CreateProduct(ProductModel model)
        {
            if (model.Items.GroupBy(x => x.Id).Any(x => x.Count() > 1))
            {
                throw new ErrorException("Product can not have the same item more than once.");
            }

            Product product;
            if (model.Id != 0)
            {
                product = _prodRepository.GetById(model.Id);
                if (product == null)
                {
                    throw new ErrorException(string.Format("Product {0} not found.", model.Id));
                }
            }
            else
            {
                product = new Product();
            }

            product.Name = model.Name;
            product.Description = model.Description;
            product.Price = model.Price;
            product.IsActive = model.IsActive;


            //var itemsToDelete = new List<ProductItem>(product.Items);
            //var itemsFromBd = model.Items.Any()
            //    ? _itemRepo.FindByIds(model.Items.Select(x => x.Id).ToList())
            //    : null;

            //foreach (var itemModel in model.Items)
            //{
            //    var item = itemsFromBd.FirstOrDefault(x => x.Id == itemModel.Id);
            //    if (item == null)
            //    {
            //        throw new ErrorException(string.Format("It was not possible to find item {0}.", itemModel.Id));
            //    }

            //    ProductItem prodItem = product.Items.FirstOrDefault(x => x.Item.Id == item.Id);
            //    if (prodItem == null)
            //    {
            //        prodItem = new ProductItem();
            //        prodItem.Item = item;
            //        prodItem.Count = itemModel.Count;
            //        product.Items.Add(prodItem);
            //    }
            //    else
            //    {
            //        prodItem.Count = itemModel.Count;
            //        itemsToDelete.Remove(prodItem);
            //    }
            //}

            //foreach (var itemToDelete in itemsToDelete)
            //{
            //    product.Items.Remove(itemToDelete);
            //}

            return product;
        }

        private IList<OrderModel> CreateOrders(IList<Order> orders, bool withProducts = true)
        {
            var list = new List<OrderModel>();

            foreach (var order in orders)
            {
                list.Add(CreateOrder(order, withProducts));
            }

            return list;
        }

        private OrderModel CreateOrder(Order order, bool withProducts = true)
        {
            var prods = new List<ProductOrderModel>();

            if (withProducts)
            {
                foreach (var prod in order.Products)
                {
                    prods.Add(new ProductOrderModel
                    {
                        Id = prod.Id,
                        Product = new ProductModel { Id = prod.Product.Id, Name = prod.Product.Name },
                        Price = prod.Price,
                        Count = prod.Count
                    });
                }
            }

            return new OrderModel
            {
                Id = order.Id,
                Date = order.Date,
                Description = order.Description,
                Client = new ClientModel { Id = order.Client.Id, Name = order.Client.Name },
                IsActive = order.IsActive,
                Products = prods
            };
        }
        #endregion
    }
}
