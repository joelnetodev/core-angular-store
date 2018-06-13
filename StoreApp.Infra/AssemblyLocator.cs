
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using StoreApp.Infra.DataBase.Repository;

namespace StoreApp.Infra
{
    internal static class AssemblyLocator
    {
        public static Assembly GetByName(string assemblyName)
        {
             var assemblyPath = AppDomain.CurrentDomain.BaseDirectory + "\\" + assemblyName;
             return System.Reflection.Assembly.LoadFile(assemblyPath);
        }
    }
}