using System;

namespace StoreApp.Util.Exceptions
{
    public class MessageException : Exception
    {
        public MessageException(string message) : base(message)
        {

        }
    }
}
