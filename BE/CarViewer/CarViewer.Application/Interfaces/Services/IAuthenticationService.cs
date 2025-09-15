using Ardalis.Result;
using CarViewer.Application.DTO.Auth;

namespace CarViewer.Application.Interfaces.Services;

/// <summary>
/// Authentication service for firebase API.
/// </summary>
public interface IAuthenticationService
{
    /// <summary>
    /// Login with email and password.
    /// </summary>
    /// <param name="registerUser">Register form</param>
    /// <param name="cancellationToken">token.</param>
    /// <returns>User id as string.</returns>
    Task<Result<string>> RegisterAsync(FirebaseRegisterDTO registerUser, CancellationToken cancellationToken = default);

    /// <summary>
    /// Delete user.
    /// </summary>
    /// <param name="identityId">User identity ID.</param>
    /// <param name="cancellationToken">token.</param>
    Task DeleteUserAsync(string identityId, CancellationToken cancellationToken = default);
}