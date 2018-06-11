using System;
using System.Collections.Generic;

namespace StoreApp.Domain.Entity
{
    public class Product : Infra.Entity.Active.Entity
    {
        public virtual string Name { get; set; }

        public virtual string Description { get; set; }

        public virtual decimal Price { get; set; }

        public virtual ICollection<ProductItem> Items { get; set; }

        public Product()
        {
            Items = new List<ProductItem>();
        }
    }
}