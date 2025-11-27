using CarViewer.Domain.Entities.Garages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarViewer.Infrastructure.Persistence.Configuration.Garages;

internal sealed class GarageInventoryConfiguration : IEntityTypeConfiguration<GarageInventory>
{
    public void Configure(EntityTypeBuilder<GarageInventory> builder)
    {
        builder.ToTable(nameof(GarageInventory));

        builder.Property(gi => gi.AddedOn)
            .IsRequired()
            .HasDefaultValueSql(DatabaseConstraintsHelper.SqlServerDefaultDateTimeValue)
            .ValueGeneratedOnAdd();
        
        // Indexes
        builder.HasIndex(gi => gi.GarageId);
        builder.HasIndex(gi => gi.VehicleId);
    }
}