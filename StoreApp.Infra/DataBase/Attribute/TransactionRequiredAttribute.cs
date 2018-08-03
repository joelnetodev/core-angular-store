using Microsoft.AspNetCore.Mvc.Filters;
using NHibernate;
using StoreApp.Infra.DataBase.SessionFactory;
using StoreApp.Infra.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web;

namespace StoreApp.Infra.DataBase.Attribute
{
    //An attribute to be placed on action in the controller in order do initiate and manage database transactions
    public class TransactionRequiredAttribute : System.Attribute, IActionFilter
    {
        //Before call action
        public void OnActionExecuting(ActionExecutingContext context)
        {
            ((ISessionFactoryInfra)context.HttpContext.RequestServices.GetService(typeof(ISessionFactoryInfra))).GetCurrentSession().BeginTransaction();
        }
        
        //After call action
        public void OnActionExecuted(ActionExecutedContext context)
        {
            var session = ((ISessionFactoryInfra)context.HttpContext.RequestServices.GetService(typeof(ISessionFactoryInfra))).GetCurrentSession();

            if (context.Exception == null)
                session.Transaction.Commit();
            else
                session.Transaction.Rollback();

            session.Transaction.Dispose();
        }
    }
}
