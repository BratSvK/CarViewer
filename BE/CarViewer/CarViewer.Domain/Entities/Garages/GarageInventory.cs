using CarViewer.Domain.Entities.Garages.Vehicles;

namespace CarViewer.Domain.Entities.Garages;

public sealed class GarageInventory : IEntity
{
    public Guid GarageId { get; init; }

    public Guid VehicleId { get; init; }

    /// <summary>
    /// The date and time when the car was added to the garage.
    /// Stored in UTC (DateTimeOffset preserves offset)
    /// </summary>
    public DateTimeOffset AddedOn { get; private set; }
    
    #region Relationships
    
    public required Garage Garage { get; init; }
    
    public required VehicleBase VehicleBase { get; init; }
    
    #endregion
}