using Microsoft.AspNetCore.Identity;

namespace CarViewer.Domain.Entities.Auth;

public class UserClaim : IdentityUserClaim<Guid>, IEntity
{
    #region MyRegion

    public required User User { get; set; }

    #endregion Relationships
}
