using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace StoreApp.Util.Exceptions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = (ex is MessageException) ? 999 : (int)HttpStatusCode.BadRequest;              
                context.Response.ContentType = "text/plain";
                
                await context.Response.WriteAsync(ex.Message);
            }
        }
    }
}
