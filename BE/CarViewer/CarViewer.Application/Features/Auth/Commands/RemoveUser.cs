using Ardalis.Result;
using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Interfaces.Repositories;
using CarViewer.Application.Interfaces.Services;
using CarViewer.Application.Mediator.Commands;
using Microsoft.Extensions.Logging;

namespace CarViewer.Application.Features.Auth.Commands;

public static class RemoveUser
{
    public record RemoveUserCommand(Guid UserId) : ICommand<Result>;

    public class Handler : ICommandHandler<RemoveUserCommand, Result>
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthenticationService _authenticationService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<Handler> _logger;

        public Handler(
            IUserRepository userRepository, 
            IAuthenticationService authenticationService, 
            IUnitOfWork unitOfWork, 
            ILogger<Handler> logger)
        {
            _userRepository = userRepository;
            _authenticationService = authenticationService;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<Result> HandleAsync(
            RemoveUserCommand request,
            CancellationToken cancellationToken)
        {
            UserIdentityDTO? userIdentity = 
                await _userRepository.GetUserByIdAsync<UserIdentityDTO>(request.UserId, cancellationToken);  
            if (string.IsNullOrEmpty(userIdentity?.IdentityId))
            {
                return Result.NotFound("User not found");
            }
            
            await _userRepository.DeleteUserByIdAsync(request.UserId, cancellationToken);

            if (!await TryRemoveFromFirebase(request, userIdentity.IdentityId, cancellationToken))
            {
                return Result.Error("Failed to delete user from authentication service.");
            }
            
            int res = await _unitOfWork.SaveChangesAsync(cancellationToken);
            if (res == 0)
            {
                _logger.LogWarning("Failed to delete user with ID {UserId} from database.", request.UserId);
                
                return Result.Error("Failed to delete user from database.");
            }
            
            return Result.NoContent();
        }

        private async Task<bool> TryRemoveFromFirebase(
            RemoveUserCommand request,
            string identityId,
            CancellationToken cancellationToken)
        {
            try
            {
                await _authenticationService.DeleteUserAsync(identityId, cancellationToken);
                
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to delete user with ID {UserId} from Firebase.", request.UserId);
                
                return false;
            }
        }
    }
}