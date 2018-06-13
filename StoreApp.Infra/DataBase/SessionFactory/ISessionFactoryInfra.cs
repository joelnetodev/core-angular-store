using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Mapping;
using NHibernate;
using NHibernate.Cfg;
using System;
using System.Collections.Generic;
using System.Text;

namespace StoreApp.Infra.DataBase.SessionFactory
{
    internal interface ISessionFactoryInfra : IDisposable
    {
        ISession GetCurrentSession();
    }
}