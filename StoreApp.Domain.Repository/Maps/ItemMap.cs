using FluentNHibernate.Mapping;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Repository.Maps
{
    internal class ItemMap : ClassMap<Item>
    {
        public ItemMap()
        {
            Table("items");

            Id(x => x.Id).Column("id");
            Map(x => x.Name).Column("name");
            Map(x => x.Description).Column("description");
            Map(x => x.IsActive).Column("is_active");

            HasMany(x => x.Products).Table("products_items").KeyColumn("item_id").Cascade.None();
        }
    }
}
