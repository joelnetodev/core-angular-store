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
    [AllowAnonymous]
    public class StatusController : Controller
    {
        public IActionResult Get()
        {
            return Ok("Everything Ok!");
        }
    }
}
