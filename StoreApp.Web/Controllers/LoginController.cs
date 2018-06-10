using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Classes;
using StoreApp.Infra.Authentication;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        IUserRepository _userRepository;

        public LoginController(IUserRepository userRepo)
        {
            _userRepository = userRepo;
        }

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

        [HttpPost("create")]
        public IActionResult Create([FromBody]UserRegisterModel model)
        {
            //verifica se usuário existe, se sim gera o token
            if (ModelState.IsValid)
            {
                if (string.IsNullOrEmpty(model.UserName) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Name))
                {
                    throw new MessageWarningException("Missing fields.");
                }


                if(_userRepository.VerifyUserNameExists(model.UserName))
                    throw new MessageWarningException("Username already exists.");

                var user = new User();
                user.Name = model.Name;
                user.UserName = model.UserName;
                user.Role = model.Role;
                user.Password = PasswordEncryptator.Encrypit(model.Password);
                _userRepository.SaveOrUpdate(user);

                return Ok();
            }
            else
                throw new MessageWarningException("Model is not valid.");
        }
    }
}
