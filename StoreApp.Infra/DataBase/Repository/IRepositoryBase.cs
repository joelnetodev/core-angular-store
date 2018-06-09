using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Infra.DataBase
{
    public interface IRepositoryBase<T> where T : class
    {
        void SaveOrUpdate(T entity);

        void SaveOrUpdate(IList<T> entity);

        void Delete(T entity);

        void Delete(IList<T> entity);
    }
}