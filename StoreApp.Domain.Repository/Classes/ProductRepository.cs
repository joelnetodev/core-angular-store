
using NHibernate.Linq;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreApp.Domain.Repository.Classes
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public List<Product> FindAllWithItems()
        {
            return Entity
                .FetchMany(x => x.Items)
                .ThenFetch(x => x.Item).ToList();
        }
    }
}
