using FluentNHibernate.Mapping;
using NHibernate;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Map
{
    internal class ProductMap : ClassMap<Product>
    {
        public ProductMap()
        {
            Table("products");
            Id(x => x.Id).Column("id");
            Map(x => x.Name).Column("name");
            Map(x => x.Price).Column("price");
            Map(x => x.Description).Column("description");
            Map(x => x.IsActive).Column("is_active");

            HasMany(x => x.Items).Table("products_items").KeyColumn("product_id").Cascade.SaveUpdate();

            //HasManyToMany(x => x.Items)
            //.Table("products_items")
            //.ParentKeyColumn("product_id")
            //.ChildKeyColumn("item_id")
            //.Cascade.SaveUpdate();
        }
    }
}
