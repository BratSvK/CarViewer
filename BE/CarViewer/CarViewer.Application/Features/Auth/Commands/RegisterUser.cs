using Ardalis.Result;
using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Interfaces.Repositories;
using CarViewer.Application.Interfaces.Services;
using CarViewer.Application.Mediator.Commands;
using CarViewer.Domain.Entities.Auth;

namespace CarViewer.Application.Features.Auth.Commands;

public static class RegisterUser
{
    public record RegisterUserCommand(string Email, string Password) : ICommand<Result<Guid>>
    {
        public string UserName => Email!.Split('@')[0];
    }

    public class Handler : ICommandHandler<RegisterUserCommand, Result<Guid>>
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserRepository _userRepository;

        public Handler(IAuthenticationService authenticationService, IUserRepository userRepository)
        {
            _authenticationService = authenticationService;
            _userRepository = userRepository;
        }

        public async Task<Result<Guid>> HandleAsync(RegisterUserCommand request,
            CancellationToken cancellationToken)
        {
            bool userExists = await _userRepository.UserExistsAsync(request.Email, cancellationToken);
            if (userExists)
            {
                return Result<Guid>.Error("User with this email already exists.");
            }
            
            Result<string> createdIdentityIdResult =
                await _authenticationService.RegisterAsync(
                    new FirebaseRegisterDTO(request.Email, request.Password),
                    cancellationToken);

            if (createdIdentityIdResult.IsError() && createdIdentityIdResult.Errors is not null)
            {
                return Result<Guid>.Error(createdIdentityIdResult);
            }
            
            var newUser = new User
            {
                Email = request.Email,
                UserName = request.UserName,
                IdentityId = createdIdentityIdResult.Value
            };

            Guid userId = await _userRepository.RegisterUserAsync(newUser, cancellationToken);
            if (userId == Guid.Empty)
            {
                await _authenticationService.DeleteUser(createdIdentityIdResult.Value, cancellationToken);
                
                return Result<Guid>.Error("Failed to create user.");
            }
            
            return Result.Success(userId);
        }
    }
}