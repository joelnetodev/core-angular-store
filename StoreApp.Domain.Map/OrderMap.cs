using FluentNHibernate.Mapping;
using NHibernate;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Map
{
    internal class OrderMap : ClassMap<Order>
    {
        public OrderMap()
        {
            Table("orders");
            Id(x => x.Id).Column("id");
            Map(x => x.Description).Column("description");
            Map(x => x.Discount).Column("discount");
            Map(x => x.Date).Column("date");

            References(x => x.Client).Column("client_id").Cascade.None();

            HasMany(x => x.Products).Table("orders_products").KeyColumn("order_id").Not.KeyNullable().Not.KeyUpdate().Cascade.AllDeleteOrphan();
        }
    }
}
