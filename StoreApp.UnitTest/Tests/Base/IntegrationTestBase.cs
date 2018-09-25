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

namespace StoreApp.UnitTest.Tests.Base
{
    public abstract class IntegrationTestBase : IDisposable
    {
        private string _authName = "Authorization";
        private string _appJson = "application/json";

        protected HttpClient Client;
        protected TestServer Server;

        public IntegrationTestBase()
        {
            Server = new TestServer(CreateWebHostBuilder());
            Client = Server.CreateClient();
            Client.DefaultRequestHeaders.Clear();
            Client.DefaultRequestHeaders.Accept.Clear();
            SetMediaTypeHeader();
        }

        private void SetMediaTypeHeader()
        {
            Client.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue(_appJson));
        }

        protected StringContent CreateContent(object obj)
        {
            return new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, _appJson);
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
                .UseConfiguration(CreateConfiguration());
        }

        private IConfiguration CreateConfiguration()
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