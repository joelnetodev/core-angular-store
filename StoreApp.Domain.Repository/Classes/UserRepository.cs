
using StoreApp.Domain.Entity;
using StoreApp.Infra.DataBase.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreApp.Domain.Repository.Classes
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
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
