using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Interfaces.Repositories;
using CarViewer.Domain.Entities.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CarViewer.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly UserManager<User> _userManager;
    private readonly ILogger<UserRepository> _logger;

    public UserRepository(UserManager<User> userManager, ILogger<UserRepository> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    public async Task<Guid> RegisterUserAsync(
        User registerUser,
        CancellationToken cancellationToken)
    {
        try
        {
            IdentityResult result = await _userManager.CreateAsync(registerUser);
            if (!result.Succeeded)
            {
                var errorDetails = string.Join(", ", result.Errors.Select(e => e.Description));
                _logger.LogError("User created not success {ErrorMessage}", errorDetails);
                
                return Guid.Empty;
            }

            return registerUser.Id;
        }
        catch (Exception ex)
        {
            _logger.LogError("User creation failed of reason {ExMessage}", ex.Message);
            return Guid.Empty;
        }
    }

    public async Task<bool> UserExistsAsync(string email, CancellationToken cancellationToken) 
        => await _userManager.Users.AnyAsync(u => u.Email == email.ToLower(), cancellationToken);

    public Task<UserDTO> GetUserById(Guid userId, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task DeleteUserById(Guid userId, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}