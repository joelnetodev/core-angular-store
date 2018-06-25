using System;
using System.Collections.Generic;
using System.Linq;

namespace StoreApp.Web.Models
{
    public class ClientModel
    {
        public int Id{ get; set; }

        public string Name { get; set; }

        public string Number { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public bool IsActive { get; set; }

        public ICollection<ClientContactModel> Contacts { get; set; }


        public ClientModel()
        {
            Contacts = new List<ClientContactModel>();
        }
    }

    public class ClientContactModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}