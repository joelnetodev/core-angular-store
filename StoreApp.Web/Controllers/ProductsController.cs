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

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private IProductRepository _prodRepository;
        private IItemRepository _itemRepo;

        public ProductsController(IProductRepository prodRepo, IItemRepository itemRepo)
        {
            _prodRepository = prodRepo;
            _itemRepo = itemRepo;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult Get()
        {
            var products = _prodRepository.FindAllWithItems();
            var items = _itemRepo.FindAll();

            return Ok(CreateProducts(products));
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var prod = _prodRepository.GetById(id);
            //var prod = new Product { Name = "Teste", Items = new List<ProductItem>
            //{
            //    new ProductItem {
            //        Item = new Item{ Name = "item" }
            //    }
            //}  };
            return Ok(CreateProduct(prod));
        }

        [HttpGet("Actives")]
        public IActionResult GetActives()
        {
            var prods = _prodRepository.FindAllActives();

            return Ok(CreateProducts(prods, false));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Save([FromBody]ProductModel model)
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(model.Name) || model.Price == 0)
            {
                throw new ErrorException("Product has missing fields.");
            }

            if (model.Items.Any(x => x.Id == 0))
            {
                throw new ErrorException("Product has unselected items.");
            }

            if (model.Items.GroupBy(x => x.Id).Any(v => v.Count() > 1))
            {
                throw new ErrorException("Product can not have the same item more than once.");
            }

            using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
            {
                var prod = CreateProduct(model);
                _prodRepository.SaveOrUpdate(prod);
                unit.Commit();
            }

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
            {
                var prod = _prodRepository.GetById(id);
                if (prod != null)
                {
                    _prodRepository.Delete(prod);
                    unit.Commit();
                }
                else
                {
                    throw new ErrorException("Product not found.");
                }

                return Ok();
            }
        }


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


            var itemsToDelete = new List<ProductItem>(product.Items);
            var itemsFromBd = model.Items.Any()
                ? _itemRepo.FindByIds(model.Items.Select(x => x.Id).ToList())
                : null;

            foreach (var itemModel in model.Items)
            {
                var item = itemsFromBd.FirstOrDefault(x => x.Id == itemModel.Id);
                if (item == null)
                {
                    throw new ErrorException(string.Format("It was not possible to find item {0}.", itemModel.Id));
                }

                ProductItem prodItem = product.Items.FirstOrDefault(x => x.Item.Id == item.Id);
                if (prodItem == null)
                {
                    prodItem = new ProductItem();
                    prodItem.Item = item;
                    prodItem.Count = itemModel.Count;
                    product.Items.Add(prodItem);
                }
                else
                {
                    prodItem.Count = itemModel.Count;
                    itemsToDelete.Remove(prodItem);
                }
            }

            foreach (var itemToDelete in itemsToDelete)
            {
                product.Items.Remove(itemToDelete);
            }

            return product;
        }

        private IList<ProductModel> CreateProducts(IList<Product> products, bool withItems = true)
        {
            var list = new List<ProductModel>();

            foreach (var product in products)
            {
                list.Add(CreateProduct(product, withItems));
            }

            return list;
        }

        private ProductModel CreateProduct(Product product, bool withItems = true)
        {
            var items = new List<ProductItemModel>();

            if (withItems)
            {
                foreach (var item in product.Items)
                {
                    items.Add(new ProductItemModel
                    {
                        Id = item.Item.Id,
                        Name = item.Item.Name,
                        Count = item.Count
                    });
                }
            }

            return new ProductModel
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                IsActive = product.IsActive,
                Items = items
            };
        }
        #endregion
    }
}
