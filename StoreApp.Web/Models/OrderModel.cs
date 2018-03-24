using System;
using System.Collections.Generic;

namespace StoreApp.Web.Models
{
    public class OrderModel
    {
        public int Id { get; set; }

        public IList<OrderProductModel> OrderProducts { get; set; }

        public DateTime Date { get; set; }

        public float Discount { get; set; }
    }
}