using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Entity.Entity
{
    public abstract class Entity
    {
        public virtual int Id { get; set; }
    }
}