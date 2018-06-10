using StoreApp.Domain.Entity.Enums;
using System;

namespace StoreApp.Web.Models
{
    public class UserRegisterModel
    {
        public string Name { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public RoleEnum Role { get; set; }
    }
}