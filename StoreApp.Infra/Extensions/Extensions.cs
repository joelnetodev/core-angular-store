using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Exceptions;
using StoreApp.Infra.Http;

namespace StoreApp.Infra.Extension
{
    public static class Extensions
    {
        //Register the "IHttpContextAccessor" and "SessionFactoryInfra" with others Dependencies of the Project.
        //Shold stay above AddMVC
        public static void AddProjectDependenciesInfra(this IServiceCollection services)
        {
            services.AddScoped<ISessionFactoryInfra, SessionFactoryInfra>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.BuildServiceProvider().GetRequiredService

            AddRepositoriesAndServices(services);
        }

        private static void AddRepositoriesAndServices(IServiceCollection services)
        {
            var assemblies = new[] { AssemblyLocator.GetByName("StoreApp.Domain.Repository.dll") };
            var typeRepositoryBase = typeof(IRepositoryBase<>);
            var typeServiceBase = typeof(IServiceBase);

            foreach (var assembly in assemblies)
            {
                var typesFromAssembly = assembly.GetTypes();
                var interfacesFromAssembly = typesFromAssembly.Where(x => x.IsInterface);
                var classesFromAssembly = typesFromAssembly.Where(x => x.IsClass);

                foreach (Type itemInterface in interfacesFromAssembly)
                {
                    if (!typeServiceBase.IsAssignableFrom(itemInterface)
                        && !itemInterface.GetInterfaces().Any(x => x.IsGenericType && x.GetGenericTypeDefinition() == typeRepositoryBase))
                    {
                        continue;
                    }

                    Type classThatImplements = classesFromAssembly.FirstOrDefault(x => itemInterface.IsAssignableFrom(x));

                    if (classThatImplements == null)
                        continue;

                    services.AddSingleton(itemInterface, classThatImplements);
                }
            }
        }

        //Store the Context into SharedHttpContext to get access to the ServiceProvider through the context.
        //Should be the first configuration than any other
        public static void ConfigureMiddlewareInfra(this IApplicationBuilder app, IServiceProvider provider)
        {
            var httpContextAccessor = app.ApplicationServices.GetRequiredService<IHttpContextAccessor>();
            System.Web.HttpContext.Configure(httpContextAccessor);

            app.UseMiddleware<RequestMiddlewareInfra>();
        }
    }
}
