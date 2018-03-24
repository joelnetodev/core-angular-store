using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Web.Authentication;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{ 
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        [HttpPost]
        public IActionResult Access([FromBody]LoginModel loginModel)
        {
            //verifica se usuário existe, se sim gera o token
            try
            {
                if (ModelState.IsValid)
                {
                    var req = Request;
                    string token = TokenGenerator.Generate(loginModel.UserName);
                    return Ok(CreateLogin(1, loginModel.UserName, token));
                }
                else
                    return BadRequest("Modelo não é válido");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private UserModel CreateLogin(int id, string userName, string token)
        {
            return new UserModel
            {
                UserName = userName,
                Id = id,
                Token = token
            };
        }
    }
}
