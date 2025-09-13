using CarViewer.Domain.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarViewer.Infrastructure.Persistence.Configuration.Auth
{
    internal class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable(nameof(Role));
            builder.Property(b => b.Id)
                .HasDefaultValueSql("NEWID()")
                .IsRequired();
            builder.Property(b => b.Name)
                .HasMaxLength(256)
                .IsRequired();
            
            builder.Ignore(p => p.NormalizedName);
            
            builder.HasIndex(b => b.Name).IsUnique();

            builder.HasMany(r => r.Users)
                .WithMany(u => u.Roles)
                .UsingEntity<UserRole>();

            // builder.HasData(
            //     new Role() { Id = new Guid("ac4ca51c-fcd7-40b8-80c0-87531381bf3e"), Name = "Vedúci laboratória", NormalizedName = Enum.GetName(AppRoles.DIRECTOR)},
            //     new Role() { Id = new Guid("88c6387b-8bd3-46c8-8dfa-442d185275fc"), Name = "Vedecko-výskumný pracovník", NormalizedName = Enum.GetName(AppRoles.WORKER) },
            //     new Role() { Id = new Guid("ba7aca67-db8f-4b6a-8879-705ed0b994e7"), Name = "PhD študent", NormalizedName = Enum.GetName(AppRoles.STUDENT) },
            //     new Role() { Id = new Guid("e0f89243-0dcb-44cf-89ef-1ccbf33c655e"), Name = "Technický pracovník", NormalizedName = Enum.GetName(AppRoles.TECHNICIAN)});
        }
    }

    internal class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
            builder.ToTable(nameof(UserRole));
            builder.HasKey(p => new { p.UserId, p.RoleId });
        }
    }
}
