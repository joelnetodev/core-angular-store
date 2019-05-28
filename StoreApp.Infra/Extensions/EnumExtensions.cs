using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;

namespace SharedInfra.Extensions
{
    public static class EnumExtensions
    {
        public static string ToDescription(this Enum enumValue)
        {
            if (enumValue == null) return null;

            FieldInfo fi = enumValue.GetType().GetField(enumValue.ToString());

            DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return attributes != null && attributes.Length > 0
                  ? attributes[0].Description
                  : enumValue.ToString();
        }
    }
}