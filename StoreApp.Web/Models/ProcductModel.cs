using System;
using System.Collections.Generic;

namespace StoreApp.Web.Models
{
    public class ProductModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public List<ProductItemModel> Items { get; set; }

        public ProductModel()
        {
            Items = new List<ProductItemModel>();
        }
    }

    public class ProductItemModel
    {
        public int Id { get; set; }

        public int ItemId { get; set; }

        public string Name { get; set; }

        public int Count { get; set; }
    }
}