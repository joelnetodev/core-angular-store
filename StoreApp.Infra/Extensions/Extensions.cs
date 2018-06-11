using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Http;

namespace StoreApp.Infra.Extension
{
    public static class Extensions
    {
        //Register the "IHttpContextAccessor" and "SessionFactoryInfra" 
        //with others Dependencies of the Project
        public static IServiceCollection AddProjectDependencies(
            this IServiceCollection services)
        {
            services.AddScoped<ISessionFactoryInfra, SessionFactoryInfra>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            return services;
        }

        //Store the Context into SharedHttpContext to get access to the ServiceProvider
        public static void ShareContext(this IApplicationBuilder app)
        {
            var httpContextAccessor = app.ApplicationServices.GetService<IHttpContextAccessor>();
            SharedHttpContext.SetHttpContextAccessor(httpContextAccessor);
        }
    }
}
