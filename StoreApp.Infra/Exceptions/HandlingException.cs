using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace StoreApp.Infra.Exceptions
{
    /*The exception middlewere is used to intercept exceptions.
     It has a constructor that will receive the request and
     an ascyn method that will be invoked when exceptions occurs.
     */
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
                //999 Code was creted to angular projects intecept and perform the error response.
                //Take a look at angular app.intecept module
                context.Response.StatusCode = (ex is MessageInfoException) ? 998 : (ex is MessageWarningException) ? 999 : (int)HttpStatusCode.BadRequest;              
                context.Response.ContentType = "text/plain";
                
                await context.Response.WriteAsync(ex.Message);
            }
        }
    }
}
