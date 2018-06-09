using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Infra.Authentication;
using StoreApp.Infra.Exceptions;
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
            if (ModelState.IsValid)
            {
                if (string.IsNullOrEmpty(loginModel.UserName) || string.IsNullOrEmpty(loginModel.Password))
                {
                    throw new MessageWarningException("Username or password incorrect.");
                }

                string token = TokenGenerator.Generate(loginModel.UserName, 1);
                return Ok(CreateLogin(1, loginModel.UserName, token));
            }
            else
                throw new MessageWarningException("Model is not valid.");
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
