using System;
using System.Collections.Generic;

namespace StoreApp.Domain.Entity
{
    public class OrderProduct : Infra.Entity.Entity
    {
        public virtual decimal Count { get; set; }

        public virtual decimal Price { get; set; }

        public virtual Product Product { get; set; }

        public decimal Amount {
            get {
                return Price * Count;
            }
        }
    }
}