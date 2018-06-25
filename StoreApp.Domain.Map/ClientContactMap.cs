using FluentNHibernate.Mapping;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Map
{
    internal class ClientContactMap : ClassMap<ClientContact>
    {
        public ClientContactMap()
        {
            Table("client_contacts");

            Id(x => x.Id).Column("id");
            Map(x => x.Name).Column("name");
            Map(x => x.Email).Column("email");
            Map(x => x.PhoneNumber).Column("phone_number");
        }
    }
}