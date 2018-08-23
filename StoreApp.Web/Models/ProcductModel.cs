using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StoreApp.Web.Models
{
    public class ProductModel
    {
        public int Id { get; set; }

        public string Description { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal? Price { get; set; }

        public bool IsActive { get; set; }

        public List<ProductItemModel> Items { get; set; }

        public ProductModel()
        {
            Items = new List<ProductItemModel>();
        }
    }

    public class ProductItemModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Count { get; set; }
    }
}