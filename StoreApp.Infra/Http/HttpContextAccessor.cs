using Microsoft.AspNetCore.Http;

namespace StoreApp.Infra.Http
{
    internal class HttpContextAccessor : IHttpContextAccessor
    {
        public HttpContext HttpContext { get; set; }
    }
}