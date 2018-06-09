using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StoreApp.Infra.Authentication
{
    public static class TokenGenerator
    {
        public static string Generate(string username, int id)
        {
            //Uniq name and name ID to identify the user
            //also, roles claim to use with permission attribute on controllers
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

        public static class Config
        {
            public const int TokenLifetimeInMinutes = 30;

            public const string Issuer = "joelnetodev";
            public const string Audience = "StoreAapp";

            private static byte[] KeyInBytes = Encoding.UTF8.GetBytes("RPYPKKC86XPMFB4GXGQW4H7RR");

            public static SymmetricSecurityKey SymmetricSecurityKey = new SymmetricSecurityKey(KeyInBytes);
        }
    }
}
