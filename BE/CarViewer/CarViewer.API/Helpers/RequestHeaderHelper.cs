using System.Net.Http.Headers;
using System.Text;
using Ardalis.Result;

namespace CarViewer.Helpers;

/// <summary>
/// Authorization helper.
/// </summary>
public static class RequestHeaderHelper
{
    private const int UserEmailIndex = 0;
    private const int UserPasswordIndex = 1;

    // format: martingajdos.zs@gmail.com:Admin1234!
    public static Result<KeyValuePair<string, string>> GetCredentials(string? authorization)
    {
        try
        {
            if (string.IsNullOrEmpty(authorization))
            {
                return Result.Invalid();
            }
            
            var authHeader = AuthenticationHeaderValue.Parse(authorization);
            if (authHeader.Parameter == null)
            {
                return Result.NotFound();
            }

            var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
            var credentials = Encoding.UTF8.GetString(credentialBytes).Split(':');
            var username = credentials[UserEmailIndex];
            var password = credentials[UserPasswordIndex];

            return new KeyValuePair<string, string>(username, password);
        }
        catch (Exception _)
        {
            return Result.Error("Invalid credentials");
        }
    }
}