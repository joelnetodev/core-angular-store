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
        public UnitOfWork()
        {
            GetCurrentSession().BeginTransaction();
        }

        public static UnitOfWork Start()
        {
            return new UnitOfWork();
        }

        private ISession GetCurrentSession()
        {
            return SharedHttpContext.GetCurrentSessionFactoryInfra().GetCurrentSession();
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
