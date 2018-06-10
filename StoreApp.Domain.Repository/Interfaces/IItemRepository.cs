
using StoreApp.Domain.Entity;
using StoreApp.Infra.DataBase;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Repository.Classes
{
    public interface IItemRepository : IRepositoryBase<Item>
    {
    }
}
