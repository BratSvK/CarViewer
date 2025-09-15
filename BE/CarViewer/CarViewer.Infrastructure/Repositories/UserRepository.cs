using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Interfaces.Repositories;
using CarViewer.Domain.Entities.Auth;
using CarViewer.Infrastructure.Persistence;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CarViewer.Infrastructure.Repositories;

internal class UserRepository : BaseRepository<User, Guid>, IUserRepository
{
    private readonly UserManager<User> _userManager;
    private readonly ILogger<UserRepository> _logger;

    public UserRepository(
        CarViewerDbContext dbContext,
        UserManager<User> userManager,
        ILogger<UserRepository> logger)
        : base(dbContext)
    {
        _userManager = userManager;
        _logger = logger;
    }

    public async Task<Guid> RegisterUserAsync(User registerUser,
        CancellationToken cancellationToken = default)
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

    public async Task<bool> UserExistsAsync(string email,
        CancellationToken cancellationToken = default) =>
        await _userManager.Users.AnyAsync(u => u.Email == email.ToLower(), cancellationToken);

    public async Task RememberLoginDateAsync(string identityId,
        CancellationToken cancellationToken = default)
    {
        await DbContext.Users
            .AsNoTracking()
            .Where(x => x.IdentityId == identityId)
            .ExecuteUpdateAsync(
                u => u.SetProperty(p => p.LastLoginTime, DateTimeOffset.Now),
                cancellationToken);
    }

    public async Task<TO?> GetUserByIdAsync<TO>(Guid userId, CancellationToken cancellationToken = default) 
        where TO : IProjectionEntity =>
        await GetAsync<TO>(userId, cancellationToken);

    public async Task<UserDTO?> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken)
    {
        return await DbContext.Users
            .Where(x => x.Id == userId)
            .ProjectToType<UserDTO>()
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task DeleteUserByIdAsync(Guid userId, CancellationToken cancellationToken)
    {
        User? useToDelete = await GetAsync(userId, cancellationToken);
        if (useToDelete != null)
        {
            Delete(useToDelete);
        }
    }
}