using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StoreApp.Infra.Http;

namespace StoreApp.Infra.IoC
{
    public static class Container
    {
        public static T Get<T>() where T : class
        {
            //Get the container from the current HttpContext stored at SharedHttpContext
            return SharedHttpContext.Current.RequestServices.GetService<T>();
        }
    }
}
