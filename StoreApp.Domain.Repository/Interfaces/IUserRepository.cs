
using StoreApp.Domain.Entity;
using StoreApp.Infra.DataBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreApp.Domain.Repository.Classes
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        User GetByUserName(string userName);

        bool VerifyUserNameExists(string userName);
    }
}
