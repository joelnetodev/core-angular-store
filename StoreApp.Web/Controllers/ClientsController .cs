using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;
using Microsoft.Extensions.DependencyInjection;
using StoreApp.Infra.DataBase.Attribute;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        private IClientRepository _clientRepsitory;

        public ClientsController(IClientRepository clientRespo)
        {
            _clientRepsitory = clientRespo;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult Get()
        {
            var clients = _clientRepsitory.FindAllWithContacts();
            return Ok(CreateClients(clients));
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var cli = _clientRepsitory.GetById(id);

            if (cli == null)
                throw new ErrorException(string.Format("Client {0} not found.", id));

            return Ok(CreateClient(cli));
        }

        [HttpGet("Actives")]
        public IActionResult GetActives()
        {
            var clis = _clientRepsitory.FindAllActives();

            return Ok(CreateClients(clis, false));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [TransactionRequired]
        public IActionResult Save([FromBody]ClientModel model)
        {
            if (!ModelState.IsValid)
            {
                throw new ModelException(ModelState);
            }


                var cli = CreateClient(model);
                _clientRepsitory.SaveOrUpdate(cli);


            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Delete/{id}")]
        [TransactionRequired]
        public IActionResult Delete(int id)
        {

                var cli = _clientRepsitory.GetById(id);
                if (cli != null)
                {
                    _clientRepsitory.Delete(cli);
                }
                else
                {
                    throw new ErrorException("Client not found.");
                }

                return Ok();
        }


        #region helpers
        private Client CreateClient(ClientModel model)
        {
            Client client;
            if (model.Id != 0)
            {
                client = _clientRepsitory.GetById(model.Id);
                if (client == null)
                {
                    throw new ErrorException(string.Format("Client {0} not found.", model.Id));
                }
            }
            else
            {
                client = new Client();
            }

            client.Name = model.Name;
            client.Number = model.Number;
            client.Address = model.Address;
            client.City = model.City;
            client.State = model.State;
            client.IsActive = model.IsActive;

            client.Contacts.Clear();

            foreach (var contactModel in model.Contacts)
            {
                var contact = new ClientContact();
                contact.Name = contactModel.Name;
                contact.Email = contactModel.Email;
                contact.PhoneNumber = contactModel.PhoneNumber;
                client.Contacts.Add(contact);
            }

            return client;
        }

        private IList<ClientModel> CreateClients(IList<Client> clients, bool withContacts = true)
        {
            var list = new List<ClientModel>();

            foreach (var product in clients)
            {
                list.Add(CreateClient(product, withContacts));
            }

            return list;
        }

        private ClientModel CreateClient(Client client, bool withContacts = true)
        {
            var contacts = new List<ClientContactModel>();
            if (withContacts)
            {
                foreach (var item in client.Contacts)
                {
                    contacts.Add(new ClientContactModel
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Email = item.Email,
                        PhoneNumber = item.PhoneNumber
                    });
                }
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
