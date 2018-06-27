using FluentNHibernate.Mapping;
using NHibernate;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Map
{
    internal class ClientMap : ClassMap<Client>
    {
        public ClientMap()
        {
            Table("clients");
            Id(x => x.Id).Column("id");
            Map(x => x.Name).Column("name");
            Map(x => x.Number).Column("number");
            Map(x => x.Address).Column("address");
            Map(x => x.City).Column("city");
            Map(x => x.State).Column("state");
            Map(x => x.IsActive).Column("is_active");

            HasMany(x => x.Contacts).Table("clients_contacts").KeyColumn("client_id").Not.KeyNullable().Not.KeyUpdate().Cascade.AllDeleteOrphan();
        }
    }
}
