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

                modelErrorList.Add(new ErrorModel
                {
                    key = itemState.Key,
                    value = itemState.Value.Errors[0].ErrorMessage
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
