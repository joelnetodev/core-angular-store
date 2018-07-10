using StoreApp.Domain.Entity.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace StoreApp.Web.Models
{
    public class UserRegisterModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public RoleEnum Role { get; set; }
    }
}