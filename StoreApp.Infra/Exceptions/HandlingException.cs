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
    public class ExceptionMiddlewareInfra
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddlewareInfra(RequestDelegate next)
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
                context.Response.StatusCode = (ex is InfoException) ? 997 : (ex is ErrorException) ? 998  : (int)HttpStatusCode.BadRequest;              
                context.Response.ContentType = "text/html";
                
                await context.Response.WriteAsync(context.Response.StatusCode == (int)HttpStatusCode.BadRequest 
                    ? ex.Message + "/n" + ex.StackTrace
                    : ex.Message);
            }
        }
    }
}
