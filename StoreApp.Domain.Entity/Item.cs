using System;
using System.Collections.Generic;

namespace StoreApp.Domain.Entity
{
    public class Item : Infra.Entity.Active.Entity
    {
        public virtual string Name { get; set; }

        public virtual string Description { get; set; }

        public virtual ICollection<ProductItem> Products { get; set; }

        public Item()
        {
            Products = new List<ProductItem>();
        }
    }
}