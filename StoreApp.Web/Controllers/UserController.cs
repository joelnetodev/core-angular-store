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
            if (!ModelState.IsValid)
            {
                throw new ModelException(ModelState);
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

        [HttpPost("create")]
        public IActionResult Create([FromBody]UserRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                throw new ModelException(ModelState);
            }

            using (var unit = UnitOfWork.Start(HttpContext.RequestServices.GetService<ISessionFactoryInfra>()))
            {
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
        }

        [Authorize]
        [HttpPost]
        public IActionResult Update([FromBody]UserRegisterModel userRegister)
        {
            if (!ModelState.IsValid)
            {
                throw new ModelException(ModelState);
            }

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
