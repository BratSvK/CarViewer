using CarViewer.Domain.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarViewer.Infrastructure.Persistence.Configuration.Auth
{
    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable(nameof(User));
            builder.Property(b => b.Id)
                .HasDefaultValueSql("NEWID()")
                .IsRequired();
            builder.Property(b => b.UserName)
                .HasMaxLength(256)
                .IsRequired();
            builder.Property(b => b.NormalizedUserName)
                .HasMaxLength(256)
                .IsRequired();
            builder.Property(b => b.ConcurrencyStamp)
                .IsRequired();
            builder.Property(b => b.Email)
                .HasMaxLength(256)
                .IsRequired();
            builder.Property(b => b.NormalizedEmail)
                .HasMaxLength(256)
                .IsRequired();
            builder.Property(b => b.IdentityId)
                .IsRequired();

            builder.Ignore(p => p.TwoFactorEnabled);
            builder.Ignore(p => p.AccessFailedCount);
            builder.Ignore(p => p.PasswordHash);
            builder.Ignore(p => p.PhoneNumber);
            builder.Ignore(p => p.PhoneNumberConfirmed);
            builder.Ignore(p => p.LockoutEnabled);
            builder.Ignore(p => p.LockoutEnd);
            builder.Ignore(p => p.EmailConfirmed);

            builder.HasIndex(b => b.Email).IsUnique();
            builder.HasIndex(b => b.IdentityId).IsUnique();

            builder.HasMany(u => u.Roles)
                .WithMany(u => u.Users)
                .UsingEntity<UserRole>();

            builder.HasMany(u => u.Claims)
                .WithOne(u => u.User);
        }
    }
}
