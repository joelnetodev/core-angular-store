using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Infra.Entity.Active
{
    public abstract class Entity : Infra.Entity.Entity
    {
        public virtual bool IsActive { get; set; }
    }
}