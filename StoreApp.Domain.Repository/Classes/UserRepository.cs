
using StoreApp.Domain.Entity;
using StoreApp.Domain.Repository.Interfaces;
using StoreApp.Infra.DataBase.Repository;
using StoreApp.Infra.DataBase.SessionFactory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreApp.Domain.Repository.Classes
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(Microsoft.AspNetCore.Http.IHttpContextAccessor sessionFactoryInfra) : base(sessionFactoryInfra)
        {
        }

        public User GetByUsername(string userName)
        {
            return Entity.FirstOrDefault(x => x.Username == userName);
        }

        public bool VerifyUsernameExists(string userName)
        {
            return Entity.Any(x => x.Username == userName);
        }
    }
}
