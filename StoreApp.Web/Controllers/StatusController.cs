using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StoreApp.Infra.DataBase;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class StatusController : Controller
    {
        private IConfiguration _configuration;

        public StatusController(IConfiguration Configuration)
        {
            _configuration = Configuration;
        }

        [HttpGet("ValidateSchema")]
        public Teste ValidateSchema()
        {
            DbConfiguration.ValidateOrCreateSchema(_configuration);

            return new Teste("Schema validated") {  };
        }

        public Teste Get()
        {
            return new Teste("Ok");
        }

        public class Teste
        {
            public Teste(string status)
            {
                Status = status;
            }
            public string Status;
        }
    }


}
