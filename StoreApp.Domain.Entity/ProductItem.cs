using System;
using System.Collections.Generic;

namespace StoreApp.Domain.Entity
{
    public class ProductItem : Entity.Entity
    {
        public virtual Procduct Procduct{ get; set; }

        public virtual Item Item{ get; set; }

        public virtual int Count { get; set; }
    }
}