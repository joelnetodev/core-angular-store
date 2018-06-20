using Microsoft.AspNetCore.Http;
using StoreApp.Infra.Exceptions;
using System;
using System.Net;
using System.Threading.Tasks;

namespace StoreApp.Infra.Http
{
    public class RequestMiddlewareInfra
    {
        private readonly RequestDelegate _next;

        public RequestMiddlewareInfra(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                //SharedHttpContext.SetHttpContex(context.RequestServices.GetService(typeof(IHttpContextAccessor)) as IHttpContextAccessor);
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