using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using StoreApp.Infra.DataBase.Repository;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Http;

namespace StoreApp.Infra.Extension
{
    public static class Extensions
    {
        //Register the "IHttpContextAccessor" and "SessionFactoryInfra" 
        //with others Dependencies of the Project
        public static void AddProjectDependencies(
            this IServiceCollection services)
        {
            var assemblies = new []{AssemblyLocator.GetByName("StroeApp.Domain.Repository.dll") };
            var interfaces = new List<Type>();
            var classes = new List<Type>();
            foreach(var assembly in assemblies)
            {
                var typesFromAssembly = assembly.GetTypes();
                //interfaces.AddRange(typesFromAssembly.Where(x => x.isty == IRepositoryBase));
            }

        }

        //Store the Context into SharedHttpContext to get access to the ServiceProvider
        public static void ConfigureSharedHttpContext(this IApplicationBuilder app, IServiceCollection services)
        {
            services.AddScoped<ISessionFactoryInfra, SessionFactoryInfra>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            SharedHttpContext.SetHttpContextAccessor(app.ApplicationServices.GetService<IHttpContextAccessor>());
        }
    }
}
