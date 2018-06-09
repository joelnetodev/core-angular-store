using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Mapping;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Infra.DataBase.SessionFactory
{
    public class SessionFactoryInfra : IDisposable
    {
        private readonly ISession _session;
        private readonly ISessionFactory _sessionFactory;

        public SessionFactoryInfra()
        {
            var assemblyPath = AppDomain.CurrentDomain.BaseDirectory + "\\StoreApp.Domain.Repository.dll";
            var assemblyMap = System.Reflection.Assembly.LoadFile(assemblyPath);

            string connString = @"Server=127.0.0.1;Port=3306;Database=db_store;Uid=user_test;Pwd=password_test;SslMode=none";

            //Fliently configuration uwing MySql Connector and "StoreApp.Domain.Repository.dll" mapped assembly
            _sessionFactory = Fluently.Configure()
                .Database(MySQLConfiguration.Standard.ConnectionString(connString))
                .Mappings(m => m.FluentMappings.AddFromAssembly(assemblyMap))
                .BuildSessionFactory();

            _session = _sessionFactory.OpenSession();
        }

        public ISession GetCurrentSession()
        {
            return _session;
        }

        public void Dispose()
        {
            _session.Close();
            _session.Dispose();
            _sessionFactory.Close();
            _sessionFactory.Dispose();
        }
    }
}
