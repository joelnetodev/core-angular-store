using System;
using System.Collections.Generic;

namespace StoreApp.Domain.Entity
{
    public class ClientContact : Infra.Entity.Entity
    {
        public virtual string Name { get; set; }

        public virtual string Email { get; set; }

        public virtual string PhoneNumber { get; set; }
    }
}