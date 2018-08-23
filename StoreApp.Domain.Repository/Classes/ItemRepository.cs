
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using StoreApp.Infra.DataBase.SessionFactory;
using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;

namespace StoreApp.Domain.Repository.Classes
{
    public class ItemRepository : RepositoryBase<Item>, IItemRepository
    {
        public ItemRepository(Microsoft.AspNetCore.Http.IHttpContextAccessor sessionFactoryInfra) : base(sessionFactoryInfra)
        {
        }

        public ICollection<Item> FindAllActives()
        {
            return Entity.Where(x => x.IsActive).ToList();
        }

    }
}
