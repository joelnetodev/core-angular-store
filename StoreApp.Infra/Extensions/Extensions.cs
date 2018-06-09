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
        public static IServiceCollection StartRegisterProjectDependencies(
            this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessorInfra>();

            services.AddScoped<SessionFactoryInfra>();

            return services;
        }

        //Store the Context into SharedHttpContext to get access to the ServiceProvider
        public static void ShareContextToContainer(this IApplicationBuilder app)
        {
            var httpContextAccessor = app.ApplicationServices.GetRequiredService<IHttpContextAccessor>();
            SharedHttpContext.Configure(httpContextAccessor);
        }
    }
}
