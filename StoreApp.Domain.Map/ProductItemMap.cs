using FluentNHibernate.Mapping;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Map
{
    internal class ProductItemMap : ClassMap<ProductItem>
    {
        public ProductItemMap()
        {
            Table("products_items");

            Id(x => x.Id).Column("id");
            Map(x => x.Count).Column("count");

            References(x => x.Item).Column("item_id").Cascade.None();
        }
    }
}