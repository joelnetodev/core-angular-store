using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using Microsoft.Extensions.DependencyInjection;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Exceptions;
using StoreApp.Infra.DataBase.UnitOfWork;
using StoreApp.Web.Models;
using StoreApp.Domain.Repository.Interfaces;
using System.Threading;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        IItemRepository _itemRepository;

        public ItemsController(IItemRepository itemRepo)
        {
            _itemRepository = itemRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var items = _itemRepository.FindAll();

            var models = items.Select(x => CreateItemModel(x));

            return Ok(models);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var item = _itemRepository.GetById(id);

            if (item == null)
            {
                throw new ErrorException(string.Format("Item {0} not found.", id));
            }

            return Ok(CreateItemModel(item));
        }

        [HttpGet("Actives")]
        public IActionResult GetActives()
        {
            var items = _itemRepository.FindAllActives();

            var models = items.Select(x => CreateItemModel(x));

            return Ok(models);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Save([FromBody]ItemModel model)
        {
            if (!ModelState.IsValid)
            {
                throw new ModelException(ModelState);
            }

            var item = CreateItem(model);

            using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
            {

                if (model.Id != 0)
                {
                    item = _itemRepository.GetById(model.Id);
                    item.Name = model.Name;
                    item.Description = model.Description;
                    item.IsActive = model.IsActive;
                }

                _itemRepository.SaveOrUpdate(item);

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
                var item = _itemRepository.GetById(id);
                if (item != null)
                {
                    _itemRepository.Delete(item);
                    unit.Commit();
                }
                else
                {
                    throw new ErrorException("Item not found.");
                }

                return Ok();
            }
        }


        #region helper
        private ItemModel CreateItemModel(Item item)
        {
            var model = new ItemModel();
            model.Id = item.Id;
            model.Name = item.Name;
            model.Description = item.Description;
            model.IsActive = item.IsActive;

            return model;
        }

        private Item CreateItem(ItemModel model)
        {
            var item = new Item();
            item.Name = model.Name;
            item.Description = model.Description;
            item.IsActive = model.IsActive;

            return item;
        }
        #endregion
    }
}
