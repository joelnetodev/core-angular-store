using FluentNHibernate.Mapping;
using NHibernate.Mapping;
using StoreApp.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Repository.Maps
{
    internal class ProductItemMap : ClassMap<ProductItem>
    {
        public ProductItemMap()
        {
            Table("products_items");

            Id(x => x.Id).Column("id");
            Map(x => x.Count).Column("count");

            References(x => x.Procduct).Column("product_id");
            References(x => x.Item).Column("item_id"); 
        }
    }
}