using NHibernate;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.IoC;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Infra.DataBase
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ISession Session
        {
            get
            {
                //Get "SessionFactoryBase" from ServiceProvider and get the Session
                return Container.Get<SessionFactoryInfra>().GetCurrentSession();
            }
        }

        public void Delete(T entity)
        {
            Session.Delete(entity);
        }

        public void Delete(IList<T> entities)
        {
            foreach (var entity in entities)
            {
                Delete(entity);
            }
        }

        public void SaveOrUpdate(T entity)
        {
            Session.SaveOrUpdate(entity);
        }

        public void SaveOrUpdate(IList<T> entities)
        {
            foreach (var entity in entities)
            {
                SaveOrUpdate(entity);
            }
        }
    }
}
