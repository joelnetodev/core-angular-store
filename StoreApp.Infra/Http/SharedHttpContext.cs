using Microsoft.AspNetCore.Http;
using System;

namespace StoreApp.Infra.Http
{
    //A Shared HttpContext with the current context every web request
    internal static class SharedHttpContext
    {
        public static HttpContext Current;

        public static void SetHttpContex(HttpContext contex)
        {
            Current = contex;
        }
    }
}
