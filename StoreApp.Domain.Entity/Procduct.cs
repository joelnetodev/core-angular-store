using System;
using System.Collections.Generic;

namespace StoreApp.Domain.Entity
{
    public class Procduct : Entity.Active.Entity
    {
        public virtual string Name { get; set; }

        public virtual string Description { get; set; }

        public virtual decimal Price { get; set; }

        public virtual ICollection<ProductItem> Items { get; set; }

        public Procduct()
        {
            Items = new List<ProductItem>();
        }
    }
}