using Microsoft.AspNetCore.Http;
using System;

namespace StoreApp.Infra.Http
{
    public class HttpContextAccessor : IHttpContextAccessor
    {
        public HttpContext HttpContext { get; set; }
    }

    //A Shared HttpContext with the current context every web request
    internal static class SharedHttpContext
    {
        public static IHttpContextAccessor Accessor;

        public static void SetHttpContex(IHttpContextAccessor accessor)
        {
            Accessor = accessor;
        }
    }
}
