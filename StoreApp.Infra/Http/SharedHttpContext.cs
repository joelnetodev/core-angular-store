using Microsoft.AspNetCore.Http;


namespace StoreApp.Infra.Http
{
    //A Shared HttpContext with the current context every web request
    internal static class SharedHttpContext
    {
        public static IHttpContextAccessor HttpContextAccessor;

        public static void SetHttpContextAccessor(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextAccessor = httpContextAccessor;
        }
    }
}
