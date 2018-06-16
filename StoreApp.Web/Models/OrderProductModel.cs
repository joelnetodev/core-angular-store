using System;
using System.Collections.Generic;

namespace StoreApp.Web.Models
{
    public class OrderProductModel
    {
        public int Id { get; set; }

        public ProductModel Product { get; set; }

        public decimal Count { get; set; }

        public decimal Value { get; set; }
    }
}