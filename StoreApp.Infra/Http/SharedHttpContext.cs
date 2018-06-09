using Microsoft.AspNetCore.Http;


namespace StoreApp.Infra.Http
{
    //A Shared HttpContext with the current context every web request
    internal static class SharedHttpContext
    {
        private static IHttpContextAccessor _contextAccessorBase;

        public static HttpContext Current => _contextAccessorBase.HttpContext;

        public static void Configure(IHttpContextAccessor contextAccessorBase)
        {
            _contextAccessorBase = contextAccessorBase;
        }
    }
}
