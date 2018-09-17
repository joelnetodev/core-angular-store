using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StoreApp.Infra;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Extension;
using StoreApp.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace StoreApp.UnitTest
{
    public static class DbTestConfiguration
    {
        private static bool _databaseCreated = false;

        public static void CreateDataBase(IConfiguration configuration)
        {
            if (_databaseCreated) return;

            string connString = configuration.GetConnectionString(ConfigProperties.ConnectionStringKey);
            string mapAssemblyName = configuration.GetKeyValueFromSection(ConfigProperties.AssemblyNamesSection, ConfigProperties.MappingKey);
            SessionFactoryInfra.CreateSchema(connString, mapAssemblyName);
            _databaseCreated = true;
        }
    }
}