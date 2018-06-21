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
        private ISessionFactoryInfra _sessionFactory;

        public UnitOfWork(ISessionFactoryInfra sessionFactory)
        {
            _sessionFactory = sessionFactory;
            _sessionFactory.GetCurrentSession().BeginTransaction();
        }

        public static UnitOfWork Start(ISessionFactoryInfra sessionFactory)
        {
            return new UnitOfWork(sessionFactory);
        }

        public void Commit()
        {
            var session = _sessionFactory.GetCurrentSession();
            session.Transaction.Commit();
        }

        public void RollBack()
        {
            var session = _sessionFactory.GetCurrentSession();
            session.Transaction.Rollback();
        }

        public void Dispose()
        {
            _sessionFactory.GetCurrentSession().Transaction.Dispose();
        }
    }
}
