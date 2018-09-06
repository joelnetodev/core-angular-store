using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using StoreApp.Web;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Xunit;

namespace StoreApp.UnitTest.Base
{
    public abstract class IntegrationTestBase : IDisposable
    {
        protected HttpClient Client;
        protected TestServer Server;

        public IntegrationTestBase()
        {
            Server = new TestServer(CreateWebHostBuilder());
            Client = Server.CreateClient();
        }

        private IWebHostBuilder CreateWebHostBuilder()
        {
            return new WebHostBuilder()
                .UseStartup<Startup>()
                .UseConfiguration(GreateConfiguration());
        }

        private IConfiguration GreateConfiguration()
        {
            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.test.json")
                .Build();
        }

        public void Dispose()
        {
            Client.Dispose();
            Server.Dispose();
        }
    }
}