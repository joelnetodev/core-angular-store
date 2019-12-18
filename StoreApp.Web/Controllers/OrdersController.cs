using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using StoreApp.Infra.DataBase.Attribute;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private IProductRepository _prodRepository;
        private IClientRepository _clientRepository;
        private IOrderRepository _orderRepository;

        public OrdersController(IProductRepository prodRepo, IClientRepository clientRepository, IOrderRepository orderRepository)
        {
            _prodRepository = prodRepo;
            _orderRepository = orderRepository;
            _clientRepository = clientRepository;
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

        [HttpPost]
        [TransactionRequired]
        public IActionResult Save([FromBody]OrderModel model)
        {
            if (!ModelState.IsValid)
            {
                throw new ModelException(ModelState);
            }

            if (model.Products.Any(x => x.Id == 0))
            {
                throw new ErrorException("Order has unselected products.");
            }

            if (model.Products.GroupBy(x => x.Id).Any(v => v.Count() > 1))
            {
                throw new ErrorException("Order can not have the same product more than once.");
            }


            var order = CreateOrder(model);
            _orderRepository.SaveOrUpdate(order);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Delete/{id}")]
        [TransactionRequired]
        public IActionResult Delete(int id)
        {

            var order = _orderRepository.GetById(id);
            if (order != null)
            {
                _orderRepository.Delete(order);
            }
            else
            {
                throw new ErrorException("Order not found.");
            }

            return Ok();
        }


        #region helpers
        private Order CreateOrder(OrderModel model)
        {
            Order order;
            if (model.Id != 0)
            {
                order = _orderRepository.GetById(model.Id);
                if (order == null)
                {
                    throw new ErrorException(string.Format("Order {0} not found.", model.Id));
                }
            }
            else
            {
                order = new Order();
            }

            var client = _clientRepository.GetById(model.ClientId.Value);
            if (client == null)
                throw new ErrorException(string.Format("Client {0} not found.", model.ClientId));

            order.Client = client;
            order.Description = model.Description;
            order.Date = model.Date.Value;
            order.Discount = model.Discount;
            order.IsActive = model.IsActive;

            var prodsToDelete = new List<OrderProduct>(order.Products);
            var prodsFromBd = model.Products.Any()
                ? _prodRepository.FindByIds(model.Products.Select(x => x.Id).ToList())
                : null;

            foreach (var itemModel in model.Products)
            {
                var prod = prodsFromBd.FirstOrDefault(x => x.Id == itemModel.Id);
                if (prod == null)
                {
                    throw new ErrorException(string.Format("It was not possible to find item {0}.", itemModel.Id));
                }

                OrderProduct prodOrder = order.Products.FirstOrDefault(x => x.Product.Id == prod.Id);
                if (prodOrder == null)
                {
                    prodOrder = new OrderProduct();
                    prodOrder.Product = prod;
                    prodOrder.Count = itemModel.Count;
                    prodOrder.Price = itemModel.Price;
                    order.Products.Add(prodOrder);
                }
                else
                {
                    prodOrder.Count = itemModel.Count;
                    prodsToDelete.Remove(prodOrder);
                }
            }

            foreach (var itemToDelete in prodsToDelete)
            {
                order.Products.Remove(itemToDelete);
            }

            return order;
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
                        Id = prod.Product.Id,
                        Name = prod.Product.Name,
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
                ClientId = order.Client.Id,
                ClientName = order.Client.Name,
                Discount = order.Discount,
                IsActive = order.IsActive,
                Products = prods
            };
        }
        #endregion
    }
}
