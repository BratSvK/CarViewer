using System.Text.Json.Serialization;
using CarViewer.Application.Interfaces.Services;

namespace CarViewer.Application.DTO.Auth;

/// <summary>
/// Deserialization class for Firebase authentication token response.
/// </summary>
public class AuthTokenDTO : IToken
{
    [JsonPropertyName("idToken")]
    public required string IdToken { get; set; }

    [JsonPropertyName("localId")]
    public required string LocalId { get; set; }
}