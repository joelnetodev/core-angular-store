using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Entity.Entity.Active
{
    public abstract class Entity : Domain.Entity.Entity.Entity
    {
        public virtual bool IsActive { get; set; }
    }
}