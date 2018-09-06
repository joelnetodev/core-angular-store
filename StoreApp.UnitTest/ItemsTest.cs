using StoreApp.UnitTest.Base;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace StoreApp.UnitTest
{
    public class ItemsTest : IntegrationTestBase
    {

        [Fact]
        public async Task GetItems()
        {
            var result = await Client.GetAsync("/api/items");
            result.EnsureSuccessStatusCode();

            var teste = await result.Content.ReadAsStringAsync();

        }
    }
}