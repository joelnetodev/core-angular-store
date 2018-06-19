using Microsoft.AspNetCore.Http;
using StoreApp.Infra.Exceptions;
using System;
using System.Net;
using System.Threading.Tasks;

namespace StoreApp.Infra.Http
{
    public class RequestMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                SharedHttpContext.SetHttpContex(context);
                await _next(context);
            }
            catch (Exception ex)
            {
                //999 Code was creted to angular projects intecept and perform the error response.
                //Take a look at angular app.intecept module
                context.Response.StatusCode = (ex is InfoException) ? 997 : (ex is ErrorException) ? 998 : (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "text/html";

                await context.Response.WriteAsync(context.Response.StatusCode == (int)HttpStatusCode.BadRequest
                    ? ex.Message + " | " + ex.StackTrace
                    : ex.Message);
            }
        }
    }
}