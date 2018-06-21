using Microsoft.AspNetCore.Http;
using StoreApp.Infra.DataBase.SessionFactory;
using System;

namespace StoreApp.Infra.Http
{
    public class HttpContextAccessor : IHttpContextAccessor
    {
        public HttpContext HttpContext { get; set; }
    }
}
