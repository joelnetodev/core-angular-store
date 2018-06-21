using NHibernate;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web;

namespace StoreApp.Infra.DataBase.UnitOfWork
{
    public class UnitOfWork : IDisposable
    {
        ISessionFactoryInfra _sessionFactory;
        public UnitOfWork(ISessionFactoryInfra sessionFactory)
        {
            _sessionFactory = sessionFactory;
        }

        public static UnitOfWork Start(ISessionFactoryInfra sessionFactory)
        {
            return new UnitOfWork(sessionFactory);
        }

        private ISession GetCurrentSession()
        {
            return _sessionFactory.GetCurrentSession();
        }

        public void Commit()
        {
            var session = GetCurrentSession();
            session.Transaction.Commit();
        }

        public void RollBack()
        {
            var session = GetCurrentSession();
            session.Transaction.Rollback();
        }

        public void Dispose()
        {
            GetCurrentSession().Transaction.Dispose();
        }
    }
}
