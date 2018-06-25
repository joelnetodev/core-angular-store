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
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private IClientRepository _clientRepsitoryo;

        public ClientController(IClientRepository clientRespo)
        {
            _clientRepsitoryo = clientRespo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var clients = _clientRepsitoryo.FindAllWithContacts();
            return Ok(CreateClients(clients));
        }

        //[HttpGet("{id:int}")]
        //public IActionResult Get(int id)
        //{
        //    var prod = _prodRepository.GetById(id);
        //    //var prod = new Product { Name = "Teste", Items = new List<ProductItem>
        //    //{
        //    //    new ProductItem {
        //    //        Item = new Item{ Name = "item" }
        //    //    }
        //    //}  };
        //    return Ok(CreateProduct(prod));
        //}

        //[HttpPost]
        //public IActionResult Save([FromBody]ProductModel model)
        //{
        //    if (!ModelState.IsValid || string.IsNullOrEmpty(model.Name) || model.Price == 0)
        //    {
        //        throw new ErrorException("Product has missing fields.");
        //    }

        //    if (model.Items.Any(x => x.Id == 0))
        //    {
        //        throw new ErrorException("Product has unselected items.");
        //    }

        //    if (model.Items.GroupBy(x => x.Id).Any(v => v.Count() > 1))
        //    {
        //        throw new ErrorException("Product can not have the same item more than once.");
        //    }

        //    using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
        //    {
        //        var prod = CreateProduct(model);
        //        _prodRepository.SaveOrUpdate(prod);
        //        unit.Commit();
        //    }

        //    return Ok();
        //}

        //[HttpPost("Delete/{id}")]
        //public IActionResult Delete(int id)
        //{
        //    using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
        //    {
        //        var prod = _prodRepository.GetById(id);
        //        if (prod != null)
        //        {
        //            _prodRepository.Delete(prod);
        //            unit.Commit();
        //        }
        //        else
        //        {
        //            throw new ErrorException("Product not found.");
        //        }

        //        return Ok();
        //    }
        //}

        //private Product CreateProduct(ProductModel model)
        //{
        //    if (model.Items.GroupBy(x => x.Id).Any(x => x.Count() > 1))
        //    {
        //        throw new ErrorException("Product can not have the same item more than once.");
        //    }

        //    Product product;
        //    if (model.Id != 0)
        //    {
        //        product = _prodRepository.GetById(model.Id);
        //        if (product == null)
        //        {
        //            throw new ErrorException(string.Format("Product {0} not found.", model.Id));
        //        }
        //    }
        //    else
        //    {
        //        product = new Product();
        //    }

        //    product.Name = model.Name;
        //    product.Description = model.Description;
        //    product.Price = model.Price;
        //    product.IsActive = model.IsActive;


        //    var itemsToDelete = new List<ProductItem>(product.Items);
        //    var itemsFromBd = model.Items.Any() 
        //        ?_itemRepo.FindByIds(model.Items.Select(x => x.Id).ToList())
        //        : null;

        //    foreach (var itemModel in model.Items)
        //    {
        //        var item = itemsFromBd.FirstOrDefault(x => x.Id == itemModel.Id);
        //        if (item == null)
        //        {
        //            throw new ErrorException(string.Format("It was not possible to find item {0}.", itemModel.Id));
        //        }

        //        ProductItem prodItem = product.Items.FirstOrDefault(x => x.Item.Id == item.Id);
        //        if (prodItem == null)
        //        {
        //            prodItem = new ProductItem();
        //            prodItem.Item = item;
        //            prodItem.Count = itemModel.Count;
        //            product.Items.Add(prodItem);
        //        }
        //        else
        //        {
        //            prodItem.Count = itemModel.Count;
        //            itemsToDelete.Remove(prodItem);
        //        }
        //    }

        //    foreach (var itemToDelete in itemsToDelete)
        //    {
        //        product.Items.Remove(itemToDelete);
        //    }

        //    return product;
        //}

        #region helpers
        private IList<ClientModel> CreateClients(IList<Client> clients)
        {
            var list = new List<ClientModel>();

            foreach (var product in clients)
            {
                list.Add(CreateClient(product));
            }

            return list;
        }

        private ClientModel CreateClient(Client client)
        {
            var contacts = new List<ClientContactModel>();

            foreach (var item in client.Contacts)
            {
                contacts.Add(new ClientContactModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    Email = item.Email,
                    PhoneNumber = item.Email
                });
            }

            return new ClientModel
            {
                Id = client.Id,
                Name = client.Name,
                Number = client.Number,
                Address = client.Address,
                City = client.City,
                State = client.State,
                IsActive = client.IsActive,
                Contacts = contacts
            };
        }
        #endregion
    }
}
