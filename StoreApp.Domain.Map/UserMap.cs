using FluentNHibernate.Mapping;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Map
{
    internal class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Table("users");

            Id(x => x.Id).Column("id");
            Map(x => x.Name).Column("name");
            Map(x => x.Username).Column("login");
            Map(x => x.Password).Column("password");
            Map(x => x.Role).Column("role");
            Map(x => x.IsActive).Column("is_active");
        }
    }
}
