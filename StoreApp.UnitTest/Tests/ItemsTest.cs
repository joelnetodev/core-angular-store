using Newtonsoft.Json;
using StoreApp.Domain.Entity;
using StoreApp.UnitTest.Tests.Base;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace StoreApp.UnitTest.Tests
{
    public class ItemsTest : IntegrationTestBase
    {
        [Fact]
        public async Task GetItems()
        {
            var response = await Client.GetAsync("/api/items");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            var items = JsonConvert.DeserializeObject<List<Item>>(result);

            Assert.Equal(items.Count, 0);
        }
    }
}