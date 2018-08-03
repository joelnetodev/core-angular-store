
using NHibernate.Linq;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using StoreApp.Infra.DataBase.SessionFactory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreApp.Domain.Repository.Classes
{
    public class ClientRepository : RepositoryBase<Client>, IClientRepository
    {
        public ClientRepository(Microsoft.AspNetCore.Http.IHttpContextAccessor sessionFactoryInfra) : base(sessionFactoryInfra)
        {
        }

        public List<Client> FindAllWithContacts()
        {
            return Entity
                .FetchMany(x => x.Contacts).ToList();
        }

        public List<Client> FindAllActives()
        {
            return Entity.Where(x => x.IsActive).ToList();
        }

        public Client GetByIdWithContacts(int id)
        {
            return Entity.Where(x => x.Id == id)
                .FetchMany(x => x.Contacts).ToList().FirstOrDefault();
        }
    }
}
