using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Mapping;
using Microsoft.Extensions.Configuration;
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

namespace StoreApp.Infra.DataBase
{
    public static class DbConfiguration
    {
        public static void ValidateOrCreateSchema(IConfiguration configuration)
        {
            string connString = configuration.GetConnectionString(AppProperties.ConnectionStringKey);
            string mapAssemblyName = configuration.GetKeyValueFromSection(AppProperties.AssemblyNamesSection, AppProperties.MappingKey);

            ValidateOrCreateSchema(connString, mapAssemblyName);
        }

        public static void ValidateOrCreateSchema(string connString, string mapAssemblyName)
        {
            Configuration configuration = CreateConfiguration(connString, mapAssemblyName);
            try
            {
                SchemaValidator validator = new SchemaValidator(configuration);
                validator.Validate();
            }
            catch (HibernateException)
            {
                SchemaUpdate schema = new SchemaUpdate(configuration);
                schema.Execute(true, true);
            }
            catch (Exception)
            {
                try
                {
                    SchemaUpdate schema = new SchemaUpdate(configuration);
                    schema.Execute(true, true);
                }
                catch (Exception)
                {
                    throw;
                }
                
                throw;
            }
        }

        public static Configuration CreateConfiguration(string connString, string mapAssemblyName)
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
    }
}