using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Classes;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Post([FromBody]ItemModel model)
        {
            if(!ModelState.IsValid || string.IsNullOrEmpty(model.Name))
            {
                throw new MessageWarningException("Item has missing fields");
            }


            var item = new Item();
            item.Name = model.Name;
            item.Description = model.Description;

            var repository = new ItemRepository();
            repository.SaveOrUpdate(item);

            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            //if (!ModelState.IsValid || string.IsNullOrEmpty(model.Name))
            //{
                //throw new MessageWarningException("Item has missing fields");
            //}


            var item = new Item();
            item.Name = "Cebola";
            item.Description ="";

            var repository = new ItemRepository();
            repository.SaveOrUpdate(item);
            repository.SaveOrUpdate(item);

            return Ok();
        }
    }
}
