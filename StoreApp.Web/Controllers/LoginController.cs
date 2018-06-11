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
                if (string.IsNullOrEmpty(loginModel.Username) || string.IsNullOrEmpty(loginModel.Password))
                {
                    throw new MessageWarningException("Missing fields.");
                }

                var userFromDb = _userRepository.GetByUsername(loginModel.Username);
                var password = PasswordEncryptator.Encrypit(loginModel.Password);
                if (userFromDb == null || userFromDb.Password != password)
                {
                    throw new MessageWarningException("Username or Password incorrect.");
                }

                string token = TokenGenerator.Generate(userFromDb.Username, userFromDb.Role.ToString());
                return Ok(CreateLogin(loginModel.Username, token));
            }
            else
                throw new MessageWarningException("Model is not valid.");
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
            //verifica se usuário existe, se sim gera o token
            if (ModelState.IsValid)
            {
                if (string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Name))
                {
                    throw new MessageWarningException("Missing fields.");
                }


                if(_userRepository.VerifyUsernameExists(model.Username))
                    throw new MessageWarningException("Username already exists.");

                var user = new User();
                user.Name = model.Name;
                user.Username = model.Username;
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
