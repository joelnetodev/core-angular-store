
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Repository.Classes
{
    public class ItemRepository : RepositoryBase<Item>, IItemRepository
    {
    }
}
