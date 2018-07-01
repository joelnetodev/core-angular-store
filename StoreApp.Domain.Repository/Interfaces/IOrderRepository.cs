
using StoreApp.Domain.Entity;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Repository.Interfaces
{
    public interface IOrderRepository : IRepositoryBase<Order>
    {
        Order GetByIdWithProducts(int id);

        List<Order> FindAllActives();

        List<Order> FindByClientAndDates(int? clientId, DateTime? startDate, DateTime? endDate);
    }
}
