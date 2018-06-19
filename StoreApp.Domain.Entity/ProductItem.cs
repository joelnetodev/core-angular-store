using System;
using System.Collections.Generic;

namespace StoreApp.Domain.Entity
{
    public class ProductItem : Infra.Entity.Entity
    {
        public virtual int Count { get; set; }

        public virtual Item Item { get; set; }
    }
}