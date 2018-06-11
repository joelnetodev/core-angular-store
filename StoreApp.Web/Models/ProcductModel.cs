using System;
using System.Collections.Generic;

namespace StoreApp.Web.Models
{
    public class ProcductModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public List<ProductItemModel> Items { get; set; }

        public ProcductModel()
        {
            Items = new List<ProductItemModel>();
        }
    }

    public class ProductItemModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Count { get; set; }
        
        public string Description { get; set; }
    }
}