using CarViewer.Domain.Entities.Garages;
using Microsoft.AspNetCore.Identity;

namespace CarViewer.Domain.Entities.Auth;

public class User : IdentityUser<Guid>, IEntity
{
    /// <summary>
    /// Identity id of user from Firebase account.
    /// </summary>
    public required string IdentityId { get; set; }
    
    /// <summary>
    /// Last login time in time.
    /// </summary>
    public DateTimeOffset? LastLoginTime { get; set; }

    #region Relationships
    
    public ICollection<Role> Roles { get; } = [];
    
    public ICollection<UserClaim> Claims { get; } = [];

    public ICollection<Garage> Garages { get; set; } = [];

    #endregion
}
