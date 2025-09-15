using Ardalis.Result;
using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Interfaces.Repositories;
using CarViewer.Application.Interfaces.Services;
using CarViewer.Application.Mediator.Commands;

namespace CarViewer.Application.Features.Auth.Commands;

public static class LoginUser
{
    public record LoginUserCommand(string Email, string Password) : ICommand<Result<LoggedUserDTO>>;

    public class Handler : ICommandHandler<LoginUserCommand, Result<LoggedUserDTO>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenProvider _tokenProvider;

        public Handler(IUserRepository userRepository, IJwtTokenProvider tokenProvider)
        {
            _userRepository = userRepository;
            _tokenProvider = tokenProvider;
        }

        public async Task<Result<LoggedUserDTO>> HandleAsync(
            LoginUserCommand command, 
            CancellationToken cancellationToken)
        {
            AuthTokenDTO? token =  
                await _tokenProvider.GetForCredentialsAsync(
                    command.Email, 
                    command.Password, 
                    cancellationToken);
            if (token is null)
            {
                return Result.Unauthorized("Bad credentials");
            }

            await _userRepository.RememberLoginDateAsync(token.LocalId, cancellationToken);

            return Result.Success(new LoggedUserDTO(token.IdToken));
        }
    }
}