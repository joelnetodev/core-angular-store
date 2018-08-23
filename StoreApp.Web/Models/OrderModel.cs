using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StoreApp.Web.Models
{
    public class OrderModel
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime? Date { get; set; }

        [Display(Name = "Client")]
        [Required]
        public int? ClientId { get; set; }

        public string ClientName { get; set; }

        public decimal Discount { get; set; }

        public bool IsActive { get; set; }

        public List<ProductOrderModel> Products { get; set; }

        public OrderModel()
        {
            Products = new List<ProductOrderModel>();
        }
    }

    public class ProductOrderModel
    {
        public int Id { get; set; }

        public string Name{ get; set; }

        public decimal Price { get; set; }

        public decimal Count { get; set; }
    }
}