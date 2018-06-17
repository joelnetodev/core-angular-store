
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
    public class ItemRepository : RepositoryBase<Item>, IItemRepository
    {
        public ICollection<Item> FindByIds(IList<int> idsItems)
        {
            return Entity.Where(x => idsItems.Contains(x.Id)).ToList();
        }
    }
}
