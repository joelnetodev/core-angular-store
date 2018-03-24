using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using StoreApp.Web.Authentication;
using Microsoft.IdentityModel.Tokens;

namespace StoreApp.Web
{
    public class Startup
    {
        /*
         Para configurar o bundleconfig.js foi necessário executar "dotnet add package BuildBundlerMinifier"
         Dessa maneira, o pacote de bundles é intalado e a complação transfere os arquivos de css e js 
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
            //Adiciona JWT como autenticação base
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddJwtBearer(options => {
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


            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //habilitar suporte a autenticação
            app.UseAuthentication();

            //Use static files para detectar arquivos estativos em wwwroot
            //e default files para procurar default/index.html
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "api/{controller=Status}/{action=Get}/{id?}");

            });
        }
    }
}
