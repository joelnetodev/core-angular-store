using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private IProductRepository _prodRepository;

        public ProductsController(IProductRepository prodRepo)
        {
            _prodRepository = prodRepo;
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
        public IActionResult Save([FromBody]ProductModel productModel)
        {
            if(!ModelState.IsValid || string.IsNullOrEmpty(productModel.Name) || productModel.Price == 0)
            {
                throw new ErrorException("Product has missing fields");
            }

            return Ok();
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
                    Id = item.Id,
                    ItemId = item.Item.Id,
                    Name = item.Item.Name,
                    Count = item.Count
                });
            }

            return new ProductModel { Id = product.Id, Name = product.Name, Price = product.Price, Items = items };
        }
        #endregion
    }
}
