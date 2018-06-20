
using StoreApp.Domain.Entity;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Repository.Interfaces
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        List<Product> FindAllWithItems();

        Product GetByIdWithItems(int id);
    }
}
