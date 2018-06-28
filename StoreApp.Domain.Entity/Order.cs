using System;
using System.Collections.Generic;
using System.Linq;

namespace StoreApp.Domain.Entity
{
    public class Order : Infra.Entity.Active.Entity
    {
        public virtual string Description { get; set; }

        public virtual decimal Discount { get; set; }

        public virtual DateTime Date { get; set; }

        public virtual ICollection<OrderProduct> Products { get; set; }

        public decimal Amount
        {
            get
            {
                return Products.Sum(x => x.Amount);
            }
        }

        public decimal FinalTotal
        {
            get
            {
                return Amount - Discount;
            }
        }

        public Order()
        {
            Products = new List<OrderProduct>();
        }
    }
}