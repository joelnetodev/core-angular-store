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
using System.Text;

namespace StoreApp.Infra.DataBase.SessionFactory
{
    public class SessionFactoryInfra : ISessionFactoryInfra
    {
        private string _connString;
        private string _mapAssemblyName;

        private readonly ISessionFactory _sessionFactory;
        private readonly ISession _session;

        public SessionFactoryInfra(string connString, string mapAssemblyName)
        {
            _connString = connString;
            _mapAssemblyName = mapAssemblyName;

            _sessionFactory = GetNHConfiguration().BuildSessionFactory();
            _session = _sessionFactory.OpenSession();
        }

        public void CreateSchema()
        {
            //To create schema (database must exist)
            var exporter = new SchemaExport(GetNHConfiguration());
            exporter.Execute(true, true, false);
        }

        private Configuration GetNHConfiguration()
        {
            var assemblyWithMaps = AssemblyLocator.GetByName(_mapAssemblyName);

            //Fluently configuration using Postgre Connector and "StoreApp.Domain.Repository.dll" mapped assembly
            //Quary and Cache setted to false due to problems making quaries constantly
            return Fluently.Configure()
                .Database(PostgreSQLConfiguration.PostgreSQL82.ConnectionString(_connString))
                .Mappings(m => m.FluentMappings.AddFromAssembly(assemblyWithMaps))
                .ExposeConfiguration(c => c.SetProperty(NHibernate.Cfg.Environment.PropertyUseReflectionOptimizer, Boolean.TrueString)
                                                 .SetProperty(NHibernate.Cfg.Environment.UseSecondLevelCache, Boolean.FalseString)
                                                 .SetProperty(NHibernate.Cfg.Environment.UseQueryCache, Boolean.FalseString))
                                                 .BuildConfiguration();
        }

        public ISession GetCurrentSession()
        {
            return _session.IsOpen ? _session : _sessionFactory.OpenSession();
        }

        public void Dispose()
        {
            _connString = null;
            _mapAssemblyName = null;

            _sessionFactory.Close();
            _sessionFactory.Dispose();
        }
    }
}