using Newtonsoft.Json;
using StoreApp.Domain.Entity;
using StoreApp.UnitTest.Tests.Base;
using System;
using StoreApp.Web.Models;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace StoreApp.UnitTest
{
    public class UserTest : IntegrationTestBase
    {
        [Fact]
        public async Task CreateUser()
        {
            var response = await Client.PostAsync("api/user/create", CreateContent(new UserRegisterModel { Name = "joel", Username = "joel", Password = "123456", Role = Domain.Entity.Enums.RoleEnum.Admin }));
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task Login()
        {
            var response = await Client.PostAsync("api/user/login", CreateContent( new LoginModel { Username = "joel", Password = "123456" }));
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            var user = JsonConvert.DeserializeObject<UserLoggedModel>(result);

            Assert.NotNull(user);
            SetTokenInClientDefaultHeader(user.Token);
        }
    }
}