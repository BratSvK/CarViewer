using Microsoft.AspNetCore.Identity;

namespace CarViewer.Domain.Entities.Auth;

public class Role : IdentityRole<Guid>, IEntity
{
    #region Relationships

    public ICollection<User> Users { get; } = [];

    #endregion
}
