using CarViewer.Domain.Entities.Garages.Vehicles.VehicleTypes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarViewer.Infrastructure.Persistence.Configuration.Garages.Vehicles.VehicleTypes;

internal sealed class CarConfiguration : IEntityTypeConfiguration<Car>
{
    public void Configure(EntityTypeBuilder<Car> builder)
    {
        builder.Property(c => c.CarType)
            .HasConversion<string>()
            .IsRequired()
            .HasMaxLength(DatabaseConstraintsHelper.VehicleTypeMaxLenght);

        builder.HasIndex(c => c.CarType);
    }
}