using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StoreApp.Infra.Authentication
{
    public static class PasswordEncryptator
    {
        private static string Encrypit(string value)
        {
            byte[] bytesCryptedFromPassword = new System.Security.Cryptography.SHA256Managed().ComputeHash(Encoding.ASCII.GetBytes(value));
            return Encoding.ASCII.GetString(bytesCryptedFromPassword);
        }
    }
}
