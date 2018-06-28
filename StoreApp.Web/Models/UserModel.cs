using StoreApp.Domain.Entity.Enums;
using System;

namespace StoreApp.Web.Models
{
    public class UserModel
    {
        public string Username { get; set; }

        public string Token { get; set; }

        public RoleEnum Role { get; set; }
    }
}