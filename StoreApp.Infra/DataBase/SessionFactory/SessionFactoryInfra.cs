using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Mapping;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Event;
using NHibernate.Tool.hbm2ddl;
using StoreApp.Infra.Extension;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;

namespace StoreApp.Infra.DataBase.SessionFactory
{
    public class SessionFactoryInfra : ISessionFactoryInfra
    {
        private readonly ISessionFactory _sessionFactory;
        private readonly ISession _session;

        public SessionFactoryInfra(string connString, string mapAssemblyName)
        {
            _sessionFactory = DbConfiguration.CreateConfiguration(connString, mapAssemblyName).BuildSessionFactory();
            _session = _sessionFactory.OpenSession();
        }

        public ISession GetCurrentSession()
        {
            return _session.IsOpen ? _session : _sessionFactory.OpenSession();
        }

        public void Dispose()
        {
            _sessionFactory.Close();
            _sessionFactory.Dispose();
        }
    }
}