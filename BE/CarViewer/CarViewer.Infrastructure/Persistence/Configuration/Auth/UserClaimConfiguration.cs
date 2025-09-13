using CarViewer.Domain.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarViewer.Infrastructure.Persistence.Configuration.Auth
{
    public class UserClaimConfiguration : IEntityTypeConfiguration<UserClaim>
    {
        public void Configure(EntityTypeBuilder<UserClaim> builder)
        {
            builder.ToTable(nameof(UserClaim));
            builder.Property(b => b.Id)
                .IsRequired();
            builder.Property(b => b.UserId)
                .IsRequired();
            builder.Property(b => b.ClaimType)
                .IsRequired();
            builder.Property(b => b.ClaimValue)
                .IsRequired();
        }
    }
}
