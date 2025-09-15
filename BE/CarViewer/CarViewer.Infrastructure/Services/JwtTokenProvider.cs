using System.Net.Http.Json;
using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Interfaces.Services;

namespace CarViewer.Infrastructure.Services;

/// <summary>
/// Named HTTP client based JWT token provider.
/// </summary>
internal sealed class JwtTokenProvider : IJwtTokenProvider
{
    private readonly HttpClient _httpClient;

    public JwtTokenProvider(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<AuthTokenDTO?> GetForCredentialsAsync(
        string email, 
        string password,
        CancellationToken cancellationToken = default)
    {
        var request = new
        {
            email,
            password,
            returnSecureToken = true
        };
        var response = await _httpClient.PostAsJsonAsync("", request, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        return await response.Content.ReadFromJsonAsync<AuthTokenDTO>(cancellationToken);
    }
}