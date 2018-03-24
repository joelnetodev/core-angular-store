using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StoreApp.Web.Authentication
{
    public static class TokenGenerator
    {
        internal static string Generate(string username, int id)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, username),
                new Claim(JwtRegisteredClaimNames.NameId, id.ToString()),
                new Claim("roles", username.Equals("Admin") ? "Admin" : "Ordinary")
            };

            var creds = new SigningCredentials(Config.SymmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Config.Issuer,
                audience: Config.Audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(Config.TokenLifetimeInMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        internal static class Config
        {
            internal const int TokenLifetimeInMinutes = 30;

            internal const string Issuer = "joelnetodev";
            internal const string Audience = "StoreAapp";

            internal static byte[] KeyInBytes = Encoding.UTF8.GetBytes("RPYPKKC86XPMFB4GXGQW4H7RR");

            internal static SymmetricSecurityKey SymmetricSecurityKey = new SymmetricSecurityKey(KeyInBytes);
        }
    }
}
