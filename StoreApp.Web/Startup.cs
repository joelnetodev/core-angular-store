using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using StoreApp.Infra.Exceptions;
using StoreApp.Infra.Authentication;
using Microsoft.AspNetCore.HttpOverrides;
using StoreApp.Infra.Extension;
using StoreApp.Domain.Repository.Classes;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra;
using StoreApp.Infra.DataBase.Repository;
using StoreApp.Infra.DataBase;
using System.Linq;

namespace StoreApp.Web
{
    public class Startup
    {
        /*
         Para configurar o bundleconfig.js foi necess�rio executar "dotnet add package BuildBundlerMinifier"
         Dessa maneira, o pacote de bundles � intalado e a compla��o transfere os arquivos de css e js 
         para a pasta wwwroot, de acordo com o bundleconfig.js
             */

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Adiciona JWT como autentica��o base
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddJwtBearer(options =>
                        {
                            options.TokenValidationParameters = new TokenValidationParameters
                            {
                                ValidateIssuer = true,
                                ValidateAudience = true,
                                ValidateLifetime = true,
                                ValidateIssuerSigningKey = true,
                                ValidIssuer = TokenGenerator.Config.Issuer,
                                ValidAudience = TokenGenerator.Config.Audience,
                                IssuerSigningKey = TokenGenerator.Config.SymmetricSecurityKey
                            };
                        });

            //This is a extension method to configure interfaces and classes of the project
            services.AddProjectDependencies();

            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IItemRepository, ItemRepository>();

            services.AddMvc();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //On linux, a request (sent to apache or nginx, etc) will be redirected to 
            //an AspNet core app ran by a kestrel service.
            //This line is to keep headers integrity after those actions
            //app.UseForwardedHeaders(new ForwardedHeadersOptions
            //{
            //    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            //});

            //habilitar suporte a autentica��o
            app.UseAuthentication();

            //Use static files para detectar arquivos estativos em wwwroot
            //e default files para procurar default/index.html
            app.UseDefaultFiles();
            app.UseStaticFiles();

            //Use ExceptionMiddleware to intercpect exceptions
            app.UseMiddleware<ExceptionMiddlewareInfra>();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                name: "default",
                template: "api/{controller}/{action}",
                defaults: new { controller = "Status", action = "Get" }
                );
            });

            //This is a extension method to share services provider
            app.ConfigureSharedHttpContext();
        }
    }
}
