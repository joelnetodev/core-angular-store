
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using StoreApp.Infra.DataBase.Repository;

namespace StoreApp.Infra
{
    public static class AssemblyLocator
    {
        public static Assembly GetByName(string assemblyName)
        {
            //LoadFrom and LoadFile has differents behaviors.
            //LoadFrom works with dinamically DI while LoadFile not.
            //It has something to do in how the assemblies are loaded
            //Ex: if we LoadFile and the Assembly is is dependent on other assembly,
            //how the CLR will get those... from the GAC, from the same directory?

             var assemblyPath = AppDomain.CurrentDomain.BaseDirectory + assemblyName;
             return Assembly.LoadFrom(assemblyPath);
        }
    }
}