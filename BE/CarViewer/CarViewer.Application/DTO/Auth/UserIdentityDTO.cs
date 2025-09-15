using CarViewer.Application.Interfaces.Repositories;

namespace CarViewer.Application.DTO.Auth;

public record UserIdentityDTO(string IdentityId) : IProjectionEntity;