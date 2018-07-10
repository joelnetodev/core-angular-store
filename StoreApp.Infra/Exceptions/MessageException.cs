using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace StoreApp.Infra.Exceptions
{
    public class ModelException : Exception
    {
        public override string Message { get { return jsonObject ?? ""; } }

        private string jsonObject;
        public ModelException(ModelStateDictionary modelState)
        {
            var modelErrorList = new List<ErrorModel>();
            foreach (var itemState in modelState)
            {
                if (itemState.Value.Errors.Count == 0)
                    continue;

                string key = itemState.Key.First().ToString().ToUpper() + itemState.Key.Substring(1);
                string error = !string.IsNullOrEmpty(itemState.Value.Errors[0].ErrorMessage)
                    ? itemState.Value.Errors[0].ErrorMessage 
                    : "The field " + key + " is invalid.";

                modelErrorList.Add(new ErrorModel
                {
                    key = key,
                    value = error

                });
            }

            jsonObject = JsonConvert.SerializeObject(modelErrorList);
        }

        private class ErrorModel
        {
            public string key { get; set; }
            public string value { get; set; }
        }
    }

    

    public class ErrorException : Exception
    {
        public ErrorException(string message) : base(message)
        {

        }
    }
}
