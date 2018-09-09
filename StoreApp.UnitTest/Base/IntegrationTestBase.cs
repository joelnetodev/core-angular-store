using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StoreApp.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace StoreApp.UnitTest.Base
{
    public abstract class IntegrationTestBase : IDisposable
    {
        private string _authName = "Authorization";

        protected HttpClient Client;
        protected TestServer Server;

        public IntegrationTestBase()
        {
            Server = new TestServer(CreateWebHostBuilder());
            Client = Server.CreateClient();
        }

        protected HttpContent CreateContent(object obj)
        {
            return new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "applicaiton/json");
        }

        protected void SetTokenInClientDefaultHeader(string token)
        {
            if (Client.DefaultRequestHeaders.Contains(_authName))
            {
                Client.DefaultRequestHeaders.Remove(_authName);
            }
            Client.DefaultRequestHeaders.Add(_authName, "Bearer " + token);
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