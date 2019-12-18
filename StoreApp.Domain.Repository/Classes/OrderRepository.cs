
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
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(ISessionFactoryInfra sessionFactoryInfra) : base(sessionFactoryInfra)
        {
        }

        public List<Order> FindAllActives()
        {
            return Entity.Where(x => x.IsActive).ToList();
        }

        public Order GetByIdWithProducts(int id)
        {
            return Entity
                 .FetchMany(x => x.Products)
                 .ThenFetch(x => x.Product).ToList().FirstOrDefault();
        }

        public List<Order> FindByClientAndDates(int? clientId, DateTime? startDate, DateTime? endDate)
        {
            var query = Entity;

            if(clientId.HasValue)
            {
                query = query.Where(x => x.Client.Id == clientId.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(x => x.Date >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(x => x.Date <= endDate.Value);
            }

            return query.ToList();
        }
    }
}