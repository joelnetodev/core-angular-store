using StoreApp.Domain.Entity.Enums;
using System;

namespace StoreApp.Domain.Entity
{
    public class User : Entity.Active.Entity
    {
        public virtual string Name { get; set; }

        public virtual string UserName { get; set; }

        public virtual string Password { get; set; }

        public virtual RoleEnum Role { get; set; }
    }
}