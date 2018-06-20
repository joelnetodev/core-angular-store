using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Classes;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.Authentication;
using StoreApp.Infra.DataBase.UnitOfWork;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;
using System.Threading;

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
                if (string.IsNullOrEmpty(loginModel.Username) || string.IsNullOrEmpty(loginModel.Password))
                {
                    throw new ErrorException("Missing fields.");
                }

                var userFromDb = _userRepository.GetByUsername(loginModel.Username);
                var password = PasswordEncryptator.Encrypit(loginModel.Password);
                if (userFromDb == null || userFromDb.Password != password)
                {
                    throw new ErrorException("Username or Password incorrect.");
                }

                string token = TokenGenerator.Generate(userFromDb.Username, userFromDb.Role.ToString());
                return Ok(CreateLogin(loginModel.Username, token));
            }
            else
                throw new ErrorException("Model is not valid.");
        }

        private UserModel CreateLogin(string userName, string token)
        {
            return new UserModel
            {
                Username = userName,
                Token = token
            };
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]UserRegisterModel model)
        {
            using (var unit = UnitOfWork.Start())
            {
                //verifica se usuário existe, se sim gera o token
                if (ModelState.IsValid)
                {
                    if (string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Name))
                    {
                        throw new ErrorException("Missing fields.");
                    }


                    if (_userRepository.VerifyUsernameExists(model.Username))
                        throw new ErrorException("Username already exists.");

                    var user = new User();
                    user.Name = model.Name;
                    user.Username = model.Username;
                    user.Role = model.Role;
                    user.Password = PasswordEncryptator.Encrypit(model.Password);
                    _userRepository.SaveOrUpdate(user);

                    unit.Commit();

                    return Ok();
                }
                else
                    throw new ErrorException("Model is not valid.");
            }
        }
    }
}
