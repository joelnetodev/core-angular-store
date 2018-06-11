using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Classes;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Exceptions;
using StoreApp.Infra.UnitOfWork;
using StoreApp.Web.Models;

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

        [Authorize(Roles = "Admin")]
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
                    throw new MessageWarningException("Item not found.");
                }

                return Ok(); 
            }   
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var items = _itemRepository.FindAll();

            var models = items.Select(x => CreateItemModel(x));

            return Ok(models);
        }

        [Authorize]
        [HttpGet("Edit/{id}")]
        public IActionResult Edit(int id)
        {
            var item = _itemRepository.GetById(id);

            if(item == null)
            {
                throw new MessageWarningException("No item found.");
            }

            return Ok(CreateItemModel(item));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody]ItemModel model)
        {
            if(!ModelState.IsValid)
            {
                throw new MessageWarningException("Model invalid.");
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
