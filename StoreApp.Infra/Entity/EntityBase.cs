using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Infra.Entity
{
    public abstract class EntityBase
    {
        public virtual int Id { get; set; }
    }
}