using Microsoft.AspNetCore.Http;
using NHibernate;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Entity;
using StoreApp.Infra.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace StoreApp.Infra.DataBase.Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T: Entity.EntityBase
    {
        private ISessionFactoryInfra _sessionFactoryInfra;
        public RepositoryBase(ISessionFactoryInfra sessionFactoryInfra)
        {
            _sessionFactoryInfra = sessionFactoryInfra;
        }

        protected NHibernate.ISession Session
        {
            get
            {
                return _sessionFactoryInfra.GetCurrentSession();
                //_sessionFactoryInfra.GetCurrentSession();
                //SharedHttpContext.GetCurrentSessionFactoryInfra().GetCurrentSession();
                //Get "SessionFactoryBase" from ServiceProvider and get the Session
                //return ((ISessionFactoryInfra)HttpContext.Current.RequestServices.GetService(typeof(ISessionFactoryInfra))).GetCurrentSession();
            }
        }

        protected IQueryable<T> Entity
        {
            get
            {
                return Session.Query<T>();
            }
        }

        protected IQueryOver<T, T> EntityOver
        {
            get
            {
                return Session.QueryOver<T>();
            }
        }

        protected IQueryable<T2> SetEntity<T2>() where T2: EntityBase
        {
            return Session.Query<T2>();
        }

        protected IQueryOver<T2, T2> SetEntityOver<T2>() where T2 : EntityBase
        {
            return Session.QueryOver<T2>();
        }

        public void Delete(T entity)
        {
            Session.Delete(entity);
        }

        public void Delete(ICollection<T> entities)
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

        public void SaveOrUpdate(ICollection<T> entities)
        {
            foreach (var entity in entities)
            {
                SaveOrUpdate(entity);
            }
        }

        public ICollection<T> FindAll()
        {
            return Entity.ToList();
        }

        public T GetById(int id)
        {
            return Entity.FirstOrDefault(x => x.Id == id);
        }

        public ICollection<T> FindByIds(IList<int> ids)
        {
            return Entity.Where(x => ids.Contains(x.Id)).ToList();
        }
    }
}
