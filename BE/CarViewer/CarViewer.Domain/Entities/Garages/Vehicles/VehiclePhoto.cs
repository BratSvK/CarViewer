namespace CarViewer.Domain.Entities.Garages.Vehicles;

public sealed class VehiclePhoto : IImageEntity
{
    public Guid Id { get; } = Guid.NewGuid();

    /// <summary>
    /// The date and time when the photo was added.
    /// Defaults to the time of creation in UTC.
    /// </summary>
    public DateTimeOffset AddOn { get; init; } 
    
    public required string ImageUrl { get; set; }
    
    #region Relationships
    
    public required VehicleBase VehicleBase { get; init; }
    
    #endregion
}