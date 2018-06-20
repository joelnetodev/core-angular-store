using Microsoft.AspNetCore.Http;

namespace StoreApp.Infra.Extension
{
    public class HttpContextAccessor : IHttpContextAccessor
    {
        public HttpContext HttpContext { get; set; }
    }
}