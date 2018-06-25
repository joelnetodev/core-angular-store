using System;
using System.Collections.Generic;
using System.Linq;

namespace StoreApp.Domain.Entity
{
    public class Client : Infra.Entity.Active.Entity
    {
        public virtual string Name { get; set; }

        public virtual string Number { get; set; }

        public virtual string Address { get; set; }

        public virtual string City { get; set; }

        public virtual string State { get; set; }

        public virtual ICollection<ClientContact> Contacts { get; set; }


        public Client()
        {
            Contacts = new List<ClientContact>();
        }
    }
}