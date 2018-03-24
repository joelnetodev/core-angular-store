using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{  
    [Route("api/[controller]")]
    public class ProductsController
        : Controller
    {
        [HttpGet, Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            return Ok(CreateProducts(3));
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int Id)
        {
            return Ok(CreateProduct(Id, "Product " + Id, ("1." + Id.ToString())));
        }

        [HttpPost, Authorize]
        public IActionResult Post([FromBody]ProcductModel productModel)
        {
            return Ok();
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
