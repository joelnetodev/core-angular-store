using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase.UnitOfWork;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{
    [AllowAnonymous]
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

        [HttpGet]
        public IActionResult Get()
        {
            var products = _prodRepository.FindAllWithItems();

            return Ok(CreateProducts(products));
        }
        
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var prod = _prodRepository.GetById(id);

            return Ok(CreateProduct(prod));
        }

        [HttpPost]
        public IActionResult Save([FromBody]ProductModel model)
        {
            if(!ModelState.IsValid || string.IsNullOrEmpty(model.Name) || model.Price == 0)
            {
                throw new ErrorException("Product has missing fields.");
            }

            using (var unit = UnitOfWork.Start())
            {
                if(model.Id == 0)
                {
                    _prodRepository.SaveOrUpdate(CreateProduct(model));
                }
                unit.Commit();
            }

            return Ok();
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            using (var unit = UnitOfWork.Start())
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

        private Product CreateProduct(ProductModel model)
        {
            if (model.Items.GroupBy(x => x.Id).Any(x => x.Count() > 1))
            {
                throw new ErrorException("Product can not have the same item more than once.");
            }

            var product = new Product();
            product.Name = model.Name;
            product.Description = model.Description;
            product.Price = model.Price;
            product.IsActive = model.IsActive;

            if(model.Items.Any())
            {
                var itemsFromBd = _itemRepo.FindByIds(model.Items.Select(x => x.Id).ToList());
                foreach (var itemModel in model.Items)
                {
                    var itemFromBd = itemsFromBd.FirstOrDefault(x => x.Id == itemModel.Id);
                    if(itemFromBd == null)
                    {
                        throw new ErrorException(string.Format("It was not possible to find item {0}.", itemModel.Id));
                    }

                    var prodItem = new ProductItem();
                    prodItem.Item = itemFromBd;
                    prodItem.Count = itemModel.Count;
                    prodItem.Procduct = product;
                    product.Items.Add(prodItem);
                }
            }

            return product;
        }

        #region helpers
        private IList<ProductModel> CreateProducts(IList<Product> products)
        {
            var list = new List<ProductModel>();

            foreach (var product in products)
            {
                list.Add(CreateProduct(product));
            }

            return list;
        }

        private ProductModel CreateProduct(Product product)
        {
            var items = new List<ProductItemModel>();
            foreach (var item in product.Items)
            {
                items.Add(new ProductItemModel {
                    Id = item.Item.Id,
                    Name = item.Item.Name,
                    Count = item.Count
                });
            }

            return new ProductModel {
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
