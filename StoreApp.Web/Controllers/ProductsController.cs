using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(CreateProducts(4));
        }

        [AllowAnonymous]
        [HttpGet("{id:int}")]
        public IActionResult Get(int Id)
        {
            return Ok(CreateProduct(Id, "Product " + Id, ("1." + Id.ToString())));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Post([FromBody]ProcductModel productModel)
        {
            if(!ModelState.IsValid || string.IsNullOrEmpty(productModel.Name) || productModel.Price == 0)
            {
                throw new MessageWarningException("Product has missing fields");
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("FindByName/{name}")]
        public IActionResult FindByName(string name)
        {
            var list = CreateProducts(4);

            var result = list.Where(x => x.Name.ToLower().Contains(name.ToLower())).OrderBy(x => x.Name).Take(10).ToList();

            return Ok(result);
        }

        [Authorize]
        [HttpGet("Row")]
        public IActionResult Row()
        {
            var products = CreateProducts(3);

            int id = 1;
            foreach (var itemProduct in products)
            {
                for (int i = 1; i < 3; i++)
                {
                    itemProduct.Items.Add(new ItemModel { Id = id, Name = "Old Item " + id, Count = i });
                    id += 1;
                }
            }

            return Ok(products);
        }

        #region helpers
        private IList<ProcductModel> CreateProducts(int qtd)
        {
            var list = new List<ProcductModel>();

            for (int i = 1; i <= qtd; i++)
            {
                list.Add(CreateProduct(i, "Product " + i, ("1." + i.ToString())));
            }

            return list;
        }

        private ProcductModel CreateProduct(int id, string name, string price)
        {
            return new ProcductModel { Id = id, Name = name, Price = float.Parse(price) };
        }
        #endregion
    }
}
