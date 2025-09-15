using CarViewer.Application.DTO.Auth;

namespace CarViewer.Application.Interfaces.Services;

public interface IJwtTokenProvider : ITokenProvider<AuthTokenDTO>;