using Microsoft.AspNetCore.Http;
using StoreApp.Infra.DataBase.SessionFactory;
using System;

namespace StoreApp.Infra.Http
{
    public class SharedHttpContext
    {
        public static object obj = new object();

        public const string SessionFactoryInfraKey = "session.factory.infra.Key";

        public static IHttpContextAccessor _contextAccessor;

        public static HttpContext Current => _contextAccessor.HttpContext;

        internal static void Configure(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        internal static ISessionFactoryInfra GetCurrentSessionFactoryInfra()
        {
            lock (obj)
            {
                if (Current.Items.ContainsKey(SessionFactoryInfraKey))
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
        }

        internal static void DisposeSessionFactory()
        {
            lock (obj)
            {
                if (Current.Items.ContainsKey(SessionFactoryInfraKey))
                {
                    ((SessionFactoryInfra)Current.Items[SessionFactoryInfraKey]).Dispose();
                    Current.Items.Remove(SessionFactoryInfraKey);
                }
            }
        }
    }
}
