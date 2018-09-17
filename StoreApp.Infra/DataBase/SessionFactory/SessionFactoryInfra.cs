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
        private const string _fluentNHibernateConfigFileName = "fluentnhibernateconfig.xml";

        private readonly ISessionFactory _sessionFactory;
        private readonly ISession _session;

        public SessionFactoryInfra(string connString, string mapAssemblyName)
        {
            _sessionFactory = CreateConfiguration(connString, mapAssemblyName).BuildSessionFactory();
            _session = _sessionFactory.OpenSession();
        }

        public static void CreateSchema(string connString, string mapAssemblyName)
        {
            new SchemaUpdate(CreateConfiguration(connString, mapAssemblyName)).Execute(true, true);
        }

        [Obsolete("Saving in file doesn't on .Net Core Apps due to different .NET Framework serialization.")]
        private static Configuration GetNHConfiguration(string connString, string mapAssemblyName)
        {
            //Save config in file to make it faster at second time databse access
            //Forces to not build configuration everytime

            //if(File.Exists(_fluentNHibernateConfigFileName))
            //{
            //    using (var file = File.Open(_fluentNHibernateConfigFileName, FileMode.Open, FileAccess.Read))
            //    {
            //        var bf = new BinaryFormatter();
            //        return bf.Deserialize(file) as Configuration;
            //    }
            //}
            //else
            //{
            //    using (var file = File.Open(_fluentNHibernateConfigFileName, FileMode.Create))
            //    {
            //        var configuration = CreateConfiguration(connString, mapAssemblyName);

            //        var bf = new BinaryFormatter();
            //        bf.Serialize(file, configuration);

            //        return configuration;
            //    }
            //} 

            return CreateConfiguration(connString, mapAssemblyName);
        }

        private static Configuration CreateConfiguration(string connString, string mapAssemblyName)
        {
            //Fluently configuration using Postgre Connector and "StoreApp.Domain.Repository.dll" mapped assembly
            //Quary and Cache setted to false due to problems making quaries constantly, besides others configuration setted to make the access quick

            return Fluently.Configure()
                .Database(PostgreSQLConfiguration.PostgreSQL82.ConnectionString(connString))
                .Mappings(m => m.FluentMappings.AddFromAssembly(AssemblyLocator.GetByName(mapAssemblyName)))
                .ExposeConfiguration(c => c
                                          .SetProperty(NHibernate.Cfg.Environment.PropertyUseReflectionOptimizer, Boolean.TrueString)
                                          .SetProperty(NHibernate.Cfg.Environment.WrapResultSets, Boolean.TrueString)
                                          .SetProperty(NHibernate.Cfg.Environment.UseSecondLevelCache, Boolean.FalseString)
                                          .SetProperty(NHibernate.Cfg.Environment.UseQueryCache, Boolean.FalseString)
                                          .SetProperty(NHibernate.Cfg.Environment.UseProxyValidator, Boolean.FalseString)
                                          .SetProperty(NHibernate.Cfg.Environment.ShowSql, Boolean.FalseString)
                                          .SetProperty(NHibernate.Cfg.Environment.QueryStartupChecking, Boolean.FalseString)
                                          .SetProperty(NHibernate.Cfg.Environment.GenerateStatistics, Boolean.FalseString)
                                          .SetProperty(NHibernate.Cfg.Environment.FormatSql, Boolean.FalseString)
                                          ).BuildConfiguration();
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