using Ardalis.Result;
using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Interfaces.Services;
using FirebaseAdmin.Auth;
using Microsoft.Extensions.Logging;

namespace CarViewer.Infrastructure.Services;

internal class FirebaseService : IAuthenticationService
{
    private readonly ILogger<FirebaseService> _logger;

    public FirebaseService(ILogger<FirebaseService> logger)
    {
        _logger = logger;
    }
    
    public async Task<Result<string>> RegisterAsync(
        FirebaseRegisterDTO registerUser,
        CancellationToken cancellationToken = default)
    {
        var userArgs = new UserRecordArgs
        {
            Email = registerUser.Email,
            Password = registerUser.Password
        };

        try
        {
            UserRecord userRecord =
                await FirebaseAuth.DefaultInstance.CreateUserAsync(userArgs, cancellationToken);

            return Result.Success(userRecord.Uid);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get value for user {UserEmail}", registerUser.Email);
            
            return Result<string>.Error(ex.Message);
        }
    }

    public async Task DeleteUserAsync(string identityId, CancellationToken cancellationToken = default) =>
        await FirebaseAuth.DefaultInstance.DeleteUserAsync(identityId, cancellationToken);
}