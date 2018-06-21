using Microsoft.AspNetCore.Http;
using StoreApp.Infra.DataBase.SessionFactory;
using System;

namespace StoreApp.Infra.Http
{
    public static class SharedHttpContext
    {
        public const string SessionFactoryInfraKey = "session.factory.infra.Key";

        private static IHttpContextAccessor _contextAccessor;

        public static Microsoft.AspNetCore.Http.HttpContext Current => _contextAccessor.HttpContext;

        internal static void Configure(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        internal static ISessionFactoryInfra GetCurrentSessionFactoryInfra()
        {
            if(Current.Items.ContainsKey(SessionFactoryInfraKey))
            {
                return (ISessionFactoryInfra)Current.Items[SessionFactoryInfraKey];
            }
            else
            {
                ISessionFactoryInfra sessionFactory = new SessionFactoryInfra();
                Current.Items.Add(SessionFactoryInfraKey, sessionFactory);
                return sessionFactory;
            }
        }

        internal static void DisposeSessionFactory()
        {
            if(Current.Items.ContainsKey(SessionFactoryInfraKey))
            {
                ((SessionFactoryInfra)Current.Items[SessionFactoryInfraKey]).Dispose();
                Current.Items.Remove(SessionFactoryInfraKey);
            }
        }
    }
}
