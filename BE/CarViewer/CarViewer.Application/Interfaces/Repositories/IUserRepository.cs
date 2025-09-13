using Ardalis.Result;
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
    /// Get user by id.
    /// </summary>
    /// <param name="userId">User id.</param>
    /// <param name="cancellationToken">Cancellation token</param>
    Task<UserDTO> GetUserById(Guid userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Delete user by id.
    /// </summary>
    /// <param name="userId">User Id.</param>
    /// <param name="cancellationToken">Token.</param>
    Task DeleteUserById(Guid userId, CancellationToken cancellationToken = default);
}