using System;
using System.Collections.Generic;

namespace StoreApp.Web.Models
{
    public class ItemModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }
    }
}