using System;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Http;

namespace StoreApp.Infra.Extension
{
    //Unfortunately I could't found any better way to get the SessionFactory outside the controller (injecting dependency on Repositories) 
    //In AspNet Classic the HttpContext were available at Aplication Level (every project or class had access to it)
    //But in Asp.Net Core, the Current HttpContext is only in the controller and Could be accessed by HttpContextAccessor
    //But I was having issues when tryied to get the Scoped Services by HttoContextAccessor
    //So I made every Repository and Service = Scoped
    //I hope the solution comes soon
    public static class StartupExtensions
    {
        const string ConnStringKey = "ConnectionString";
        const string AssemblyNamesSection = "AssemblyNames";
        const string MapKey = "Mapping";
        const string DependenciesKey = "Dependencies";
  

        //Register the "IHttpContextAccessor" and "SessionFactoryInfra" with others Dependencies of the Project.
        //Shold stay above AddMVC
        public static void ConfigureProjectDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            //Add HttpContextAccessor as singleton instance and .NET Core is in charge to recover the current Context
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            string connString = configuration.GetConnectionString(ConnStringKey);
            string mapAssemblyName = configuration.GetSection(AssemblyNamesSection).GetValue<string>(MapKey);
           
            //SessionFactory is Scoped per WebRequest
            services.AddScoped<ISessionFactoryInfra>(x => new SessionFactoryInfra(connString, mapAssemblyName));

            var assembliesToSearch = configuration.GetSection($"{AssemblyNamesSection}:{DependenciesKey}").Get<string[]>();         
            AddRepositoriesAndServices(services, assembliesToSearch);
        }

        //Store the Context into SharedHttpContext to get access to the ServiceProvider through the context.
        //Should be the first configuration than any other
        public static void ConfigureMiddlewareInfra(this IApplicationBuilder app)
        {
            //var httpContextAccessor = app.ApplicationServices.GetRequiredService<IHttpContextAccessor>();
            //SharedHttpContext.Configure(httpContextAccessor);

            app.UseMiddleware<RequestMiddlewareInfra>();
        }


        private static void AddRepositoriesAndServices(IServiceCollection services, string[] assembliesToSearch)
        {
            var assemblies = assembliesToSearch.Select(x => AssemblyLocator.GetByName(x));

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

                    //The rest of the services and repositories are singleton in order to prevent more than one instance.
                    //Stateless classes are needed, This is to say no properties can't be stored, unless they are constants or statics 
                    services.AddSingleton(itemInterface, classThatImplements);
                }
            }
        }
    }
}
