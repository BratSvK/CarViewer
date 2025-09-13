namespace CarViewer.Application.DTO.Auth;

public class UserDTO
{
    /// <summary>
    /// Identity id of user from Firebase account.
    /// </summary>
    public string? IdentityId { get; set; }

    /// <summary>
    /// Last login time in time.
    /// </summary>
    public DateTimeOffset? LastLoginTime { get; set; }
}