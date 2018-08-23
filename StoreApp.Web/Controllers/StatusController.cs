using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class StatusController : Controller
    {
        //public IActionResult Get()
        //{
        //    return Ok(new { Status = "Ok" });
        //}

        public Teste Get()
        {
            return new Teste();
        }

        public class Teste
        {
            public string Status = "Ok";
        }
    }


}
