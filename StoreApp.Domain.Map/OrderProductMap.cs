using FluentNHibernate.Mapping;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Map
{
    internal class OrderProductMap : ClassMap<OrderProduct>
    {
        public OrderProductMap()
        {
            Table("orders_products");

            Id(x => x.Id).Column("id");
            Map(x => x.Count).Column("count");
            Map(x => x.Price).Column("price");

            References(x => x.Product).Column("product_id").Cascade.None();
        }
    }
}