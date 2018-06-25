
using StoreApp.Domain.Entity;
using StoreApp.Infra.DataBase;
using StoreApp.Infra.DataBase.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Domain.Repository.Interfaces
{
    public interface IClientRepository : IRepositoryBase<Client>
    {
        List<Client> FindAllWithContacts();

        Client GetByIdWithContacts(int id);
    }
}
