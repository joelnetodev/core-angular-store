using System;

namespace StoreApp.Infra.Exceptions
{
    public class MessageInfoException : Exception
    {
        public MessageInfoException(string message) : base(message)
        {

        }
    }

    public class MessageWarningException : Exception
    {
        public MessageWarningException(string message) : base(message)
        {

        }
    }
}
