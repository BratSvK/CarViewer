using CarViewer.Domain.Entities.Garages;
using CarViewer.Domain.Entities.Garages.Vehicles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarViewer.Infrastructure.Persistence.Configuration.Garages.Vehicles;

internal sealed class VehicleBaseConfiguration : IEntityTypeConfiguration<VehicleBase>
{
    public void Configure(EntityTypeBuilder<VehicleBase> builder)
    {
        builder.ToTable("Vehicles");
        
        builder.HasKey(v => v.Id);

        builder.Property<string>("Discriminator")
            .HasMaxLength(DatabaseConstraintsHelper.VehicleTypeDiscriminatorMaxLenght);
        
        builder.Property(v => v.Brand)
            .IsRequired()
            .HasMaxLength(DatabaseConstraintsHelper.VehicleBrandMaxLenght);

        builder.Property(v => v.Year)
            .IsRequired();

        builder.Property(v => v.VIN)
            .IsRequired()
            .HasMaxLength(DatabaseConstraintsHelper.VehicleVinMaxLenght);

        builder.Property(v => v.FuelConsumption)
            .HasPrecision(5, 2);

        builder.Property(v => v.GasType)
            .HasConversion<string>()
            .IsRequired()
            .HasMaxLength(DatabaseConstraintsHelper.VehicleTypeMaxLenght);

        builder.Property(v => v.EngineVolume)
            .HasPrecision(3, 1);

        builder.Property(v => v.EngineType)
            .HasConversion<string>()
            .IsRequired()
            .HasMaxLength(DatabaseConstraintsHelper.VehicleTypeMaxLenght);

        builder.Ignore(v => v.EngineModel);

        builder.HasMany(v => v.VehiclePhotos)
            .WithOne(p => p.VehicleBase)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(v => v.Garages)
            .WithMany(g => g.Vehicles)
            .UsingEntity<GarageInventory>(
                j => j.HasOne(gi => gi.Garage)
                    .WithMany(g => g.GarageInventories)
                    .HasForeignKey(gi => gi.GarageId),
                j => j.HasOne(gi => gi.VehicleBase)
                    .WithMany(v => v.GarageInventories)
                    .HasForeignKey(gi => gi.VehicleId));

        builder.HasIndex(v => v.VIN).IsUnique();
    }
}