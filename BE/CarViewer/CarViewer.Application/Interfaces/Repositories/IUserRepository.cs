using CarViewer.Application.DTO.Auth;
using CarViewer.Domain.Entities.Auth;

namespace CarViewer.Application.Interfaces.Repositories;

/// <summary>
/// User repository.
/// </summary>
public interface IUserRepository
{
    /// <summary>
    /// Register new user.
    /// </summary>
    /// <param name="registerUser">New user.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    Task<Guid> RegisterUserAsync(User registerUser, CancellationToken cancellationToken = default);

    /// <summary>
    /// Check user by email.
    /// </summary>
    /// <param name="email">User email.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    Task<bool> UserExistsAsync(string email, CancellationToken cancellationToken = default);
    
    /// <summary>
    /// Remember login date.
    /// </summary>
    /// <param name="identityId">User identity ID.</param>
    /// <param name="cancellationToken">Cancel token.</param>
    Task RememberLoginDateAsync(string identityId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Get user by id.
    /// </summary>
    /// <param name="userId">User id.</param>
    /// <param name="cancellationToken">Cancellation token</param>
    Task<TO?> GetUserByIdAsync<TO>(Guid userId, CancellationToken cancellationToken = default)
        where TO : IProjectionEntity;
    
    /// <summary>
    /// Get logged user id by identity id.
    /// </summary>
    /// <param name="identityId">Token identity provider ID.</param>
    /// <param name="cancellationToken">Cancellation token</param>
    Task<Guid> GetUserIdByIdentityIdAsync(string identityId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Delete user by id.
    /// </summary>
    /// <param name="userId">User Id.</param>
    /// <param name="cancellationToken">Token.</param>
    Task DeleteUserByIdAsync(Guid userId, CancellationToken cancellationToken = default);
}