using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Classes;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Exceptions;
using StoreApp.Infra.DataBase.UnitOfWork;
using StoreApp.Web.Models;
using StoreApp.Domain.Repository.Interfaces;
using System.Threading;

namespace StoreApp.Web.Controllers
{
    [Authorize(Roles = "Admin")]
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

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            Thread.Sleep(4000);

            var item = _itemRepository.GetById(id);

            if(item == null)
            {
                throw new ErrorException("No item found.");
            }

            return Ok(CreateItemModel(item));
        }

        [HttpPost]
        public IActionResult Save([FromBody]ItemModel model)
        {
            if(!ModelState.IsValid)
            {
                throw new ErrorException("Model invalid.");
            }

            var item = CreateItem(model);

            using (var unit = UnitOfWork.Start())
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

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            using (var unit = UnitOfWork.Start())
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
    }
}
