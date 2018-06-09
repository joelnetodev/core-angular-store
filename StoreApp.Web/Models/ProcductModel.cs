using System;
using System.Collections.Generic;

namespace StoreApp.Web.Models
{
    public class ProcductModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public List<ItemModel> Items { get; set; }

        public ProcductModel()
        {
            Items = new List<ItemModel>();
        }
    }

    public class ItemModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Count { get; set; }
        
        public string Description { get; set; }
    }
}