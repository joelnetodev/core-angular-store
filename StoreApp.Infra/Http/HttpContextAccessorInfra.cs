using Microsoft.AspNetCore.Http;

namespace StoreApp.Infra.Http
{
    internal class HttpContextAccessorInfra : IHttpContextAccessor
    {
        public HttpContext HttpContext { get; set; }
    }
}