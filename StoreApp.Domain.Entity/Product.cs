using System;
using System.Collections.Generic;
using System.Linq;

namespace StoreApp.Domain.Entity
{
    public class Product : Infra.Entity.EntityBase
    {
        public virtual string Name { get; set; }

        public virtual string Description { get; set; }

        public virtual decimal Price { get; set; }

        public virtual ICollection<ProductItem> Items { get; set; }

        public virtual bool IsActive { get; set; }

        //public void AddItem(ProductItem item)
        //{
        //    var itemOfProduct = Items.FirstOrDefault(x => x.Item.Id == item.Item.Id);
        //    if (itemOfProduct != null)
        //    {
        //        itemOfProduct.Count = item.Count;
        //    }
        //    else
        //    {
        //        item.Procduct = this;
        //        Items.Add(item);
        //    }   
        //}

        public Product()
        {
            Items = new List<ProductItem>();
        }
    }
}