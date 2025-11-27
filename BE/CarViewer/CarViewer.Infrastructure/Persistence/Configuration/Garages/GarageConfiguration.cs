using CarViewer.Domain.Entities.Auth;
using CarViewer.Domain.Entities.Garages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarViewer.Infrastructure.Persistence.Configuration.Garages;

internal sealed class GarageConfiguration : IEntityTypeConfiguration<Garage>
{
    public void Configure(EntityTypeBuilder<Garage> builder)
    {
        builder.ToTable(nameof(Garage));

        builder.HasKey(g => g.Id);

        builder.Property(g => g.Id)
            .HasDefaultValueSql(DatabaseConstraintsHelper.SqlServerDefaultGuidValue)
            .IsRequired();

        builder.Property(g => g.Name)
            .IsRequired()
            .HasMaxLength(DatabaseConstraintsHelper.GarageNameMaxLenght);

        builder.Property(g => g.ImageUrl)
            .IsRequired()
            .HasMaxLength(DatabaseConstraintsHelper.ImageUrlMaxLenght);

        builder.Property(g => g.Capacity)
            .IsRequired()
            .HasDefaultValue(Garage.DefaultCapacity);
        
        builder.Property(g => g.Created)
            .IsRequired()
            .HasDefaultValueSql(DatabaseConstraintsHelper.SqlServerDefaultDateTimeValue)
            .ValueGeneratedOnAdd();
        
        builder.HasIndex(g => new { g.OwnerId, g.Name })
            .IsUnique();

        builder.HasIndex(g => g.OwnerId);

        builder.HasOne(g => g.Owner)
            .WithMany(u => u.Garages)
            .HasForeignKey(g => g.OwnerId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasMany(d => d.Vehicles)
            .WithMany(p => p.Garages)
            .UsingEntity<GarageInventory>(
                j => j
                    .HasOne(ett => ett.VehicleBase)
                    .WithMany(et => et.GarageInventories)
                    .HasForeignKey(ett => ett.VehicleId),
                j => j
                    .HasOne(ett => ett.Garage)
                    .WithMany(et => et.GarageInventories)
                    .HasForeignKey(ett => new { ett.GarageId }),
                j =>
                {
                    j.HasKey(t => new { t.VehicleId, t.GarageId });
                });
    }
}