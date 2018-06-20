﻿using NHibernate;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Infra.DataBase.UnitOfWork
{
    public class UnitOfWork : IDisposable
    {
        public UnitOfWork()
        {
            var session =  GetCurrentSession();
            session.BeginTransaction();
        }

        public static UnitOfWork Start()
        {
            return new UnitOfWork();
        }

        private ISession GetCurrentSession()
        {
            var sessionFac = SharedHttpContext.Accessor.HttpContext.RequestServices.GetService(typeof(ISessionFactoryInfra)) as ISessionFactoryInfra;

            return sessionFac.GetCurrentSession();
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
