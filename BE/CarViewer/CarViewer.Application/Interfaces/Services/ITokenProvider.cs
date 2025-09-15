namespace CarViewer.Application.Interfaces.Services;

/// <summary>
/// External service to provide JWT tokens.
/// </summary>
public interface ITokenProvider<TToken>
    where TToken : IToken
{
    /// <summary>
    /// Get JWT token for specified credentials.
    /// </summary>
    /// <param name="email">User email.</param>
    /// <param name="password">User password.</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Firebase Token.</returns>
    Task<TToken?> GetForCredentialsAsync(
        string email, 
        string password, 
        CancellationToken cancellationToken = default);
}