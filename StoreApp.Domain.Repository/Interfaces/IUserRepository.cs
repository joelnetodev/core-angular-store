
using StoreApp.Domain.Entity;
using StoreApp.Infra.DataBase.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreApp.Domain.Repository.Interfaces
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        User GetByUsername(string userName);

        bool VerifyUsernameExists(string userName);
    }
}
