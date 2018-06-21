﻿
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
    public class ProductItemRepository : RepositoryBase<ProductItem>, IProductItemRepository
    {
        public ProductItemRepository(ISessionFactoryInfra sessionFactory) : base(sessionFactory)
        {
        }
    }
}
