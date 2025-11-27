using CarViewer.Domain.Entities.Garages.Vehicles;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarViewer.Infrastructure.Persistence.Configuration.Garages.Vehicles;

internal sealed class VehiclePhotoConfiguration : IEntityTypeConfiguration<VehiclePhoto>    
{
    public void Configure(EntityTypeBuilder<VehiclePhoto> builder)
    {
        builder.ToTable(nameof(VehiclePhoto));

        builder.Property(g => g.Id)
            .HasDefaultValueSql(DatabaseConstraintsHelper.SqlServerDefaultGuidValue)
            .IsRequired();

        builder.Property(p => p.AddOn)
            .IsRequired()
            .HasDefaultValueSql(DatabaseConstraintsHelper.SqlServerDefaultDateTimeValue)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.ImageUrl)
            .IsRequired()
            .HasMaxLength(DatabaseConstraintsHelper.ImageUrlMaxLenght);

        builder.HasOne(v => v.VehicleBase)
            .WithMany(p => p.VehiclePhotos)
            .OnDelete(DeleteBehavior.Cascade);
    }
}