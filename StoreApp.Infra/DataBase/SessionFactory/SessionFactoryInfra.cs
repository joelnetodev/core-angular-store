﻿using FluentNHibernate.Cfg;
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
    internal class SessionFactoryInfra : ISessionFactoryInfra
    {
        private readonly ISessionFactory _sessionFactory;
        private readonly ISession _session;

        public SessionFactoryInfra(string connString)
        {
            var assemblyWithMaps = AssemblyLocator.GetByName("StoreApp.Domain.Map.dll");

            //string connString = @"Server=127.0.0.1;Port=3306;Database=db_store;Uid=user_test;Pwd=password_test;SslMode=none";

            //Fliently configuration using Postgre Connector and "StoreApp.Domain.Repository.dll" mapped assembly
            //Quary and Cache setted to false due to problems making quaries constantly
            var fConfiguration = Fluently.Configure()
                .Database(PostgreSQLConfiguration.PostgreSQL82.ConnectionString(connString))
                .Mappings(m => m.FluentMappings.AddFromAssembly(assemblyWithMaps))
                .ExposeConfiguration(c => c.SetProperty(NHibernate.Cfg.Environment.PropertyUseReflectionOptimizer, Boolean.TrueString)
                                                 .SetProperty(NHibernate.Cfg.Environment.UseSecondLevelCache, Boolean.FalseString)
                                                 .SetProperty(NHibernate.Cfg.Environment.UseQueryCache, Boolean.FalseString))
                                                 .BuildConfiguration();

            //To create schema (database must exist)
            //var exporter = new SchemaExport(fConfiguration);
            //exporter.Execute(true, true, false);

            _sessionFactory = fConfiguration.BuildSessionFactory();
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