using System;
using System.Collections.Generic;

namespace StoreApp.Web.Models
{
    public class OrderModel
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public int ClientId { get; set; }

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