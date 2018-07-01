using Microsoft.AspNetCore.Mvc;
using StoreApp.Domain.Entity;
using Microsoft.Extensions.DependencyInjection;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.Authentication;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.DataBase.UnitOfWork;
using StoreApp.Infra.Exceptions;
using StoreApp.Web.Models;
using System.Threading;
using StoreApp.Domain.Entity.Enums;
using Microsoft.AspNetCore.Authorization;

namespace StoreApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private const string EncrypedForDisplay = "encryped for display";

        IUserRepository _userRepository;
        public UserController(IUserRepository userRepo)
        {
            _userRepository = userRepo;
        }

        [HttpPost("login")]
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
                return Ok(CreateUserLogged(userFromDb, token));
            }
            else
                throw new ErrorException("Model is not valid.");
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]UserRegisterModel model)
        {
            using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
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

        [Authorize]
        [HttpPost]
        public IActionResult Update([FromBody]UserRegisterModel userRegister)
        {
            if (string.IsNullOrEmpty(userRegister.Password) || string.IsNullOrEmpty(userRegister.Name))
                throw new ErrorException("User has missing fields.");

            string username = HttpContext.User.Identity.Name;
            var user = _userRepository.GetByUsername(username);

            if (user == null)
                throw new ErrorException(string.Format("User {0} not found.", username));

            using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
            {
                user.Name = userRegister.Name;
                if (userRegister.Password != EncrypedForDisplay)
                {
                    user.Password = PasswordEncryptator.Encrypit(userRegister.Password);
                }

                unit.Commit();
            }

            return Ok();
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            string username = HttpContext.User.Identity.Name;
            var user = _userRepository.GetByUsername(username);

            if (user == null)
                throw new ErrorException(string.Format("User {0} not found.", username));

            return Ok(CreateUserRegister(user));
        }

        private UserLoggedModel CreateUserLogged(User user, string token)
        {
            return new UserLoggedModel
            {
                Username = user.Username,
                Role = user.Role,
                Token = token
            };
        }

        private UserRegisterModel CreateUserRegister(User user)
        {
            return new UserRegisterModel
            {
                Username = user.Username,
                Role = user.Role,
                Name = user.Name,
                Password = EncrypedForDisplay
            };
        }
    }
}
