using Microsoft.AspNetCore.Http;
using System;

namespace StoreApp.Infra.Http
{
    //A Shared HttpContext with the current context every web request
    internal static class SharedHttpContext
    {
        public static IHttpContextAccessor HttpContextAccessor;

        public static void SetHttpContextAccessor(IHttpContextAccessor accessor)
        {
            HttpContextAccessor = accessor;
        }
    }
}
