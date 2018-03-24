using System;
using System.Collections.Generic;

namespace StoreApp.Web.Models
{
    public class OrderProductModel
    {
        public int Id { get; set; }

        public ProcductModel Product { get; set; }

        public float Price { get; set; }
    }
}