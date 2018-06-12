using System;

namespace StoreApp.Infra.Exceptions
{
    public class InfoException : Exception
    {
        public InfoException(string message) : base(message)
        {

        }
    }

    public class ErrorException : Exception
    {
        public ErrorException(string message) : base(message)
        {

        }
    }
}
