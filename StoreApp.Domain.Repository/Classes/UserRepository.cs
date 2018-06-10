
using StoreApp.Domain.Entity;
using StoreApp.Infra.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreApp.Domain.Repository.Classes
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public User GetByUserName(string userName)
        {
            return Entity.FirstOrDefault(x => x.UserName == userName);
        }

        public bool VerifyUserNameExists(string userName)
        {
            return Entity.Any(x => x.UserName == userName);
        }
    }
}
