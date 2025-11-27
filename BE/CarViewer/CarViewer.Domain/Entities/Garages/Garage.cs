using CarViewer.Domain.Entities.Auth;
using CarViewer.Domain.Entities.Garages.Vehicles;

namespace CarViewer.Domain.Entities.Garages;

public sealed class Garage : IImageEntity
{
    public const int DefaultCapacity = 1;
    
    public Guid Id { get;  } = Guid.NewGuid();

    public Guid OwnerId { get; init; }
    
    public required string Name { get; init; }
    
    /// <summary>
    /// Profile thumbnail for garage.
    /// </summary>
    public required string ImageUrl { get; set; }

    /// <summary>
    /// Total amount of cars the garage can hold
    /// Can be set by subscription plan limits
    /// </summary>
    public int Capacity { get; private set; } = DefaultCapacity;
    
    /// Stored in UTC (DateTimeOffset preserves offset)
    public DateTimeOffset Created { get; private set; }
    
    #region Relationships

    public required User Owner { get; init; }
    
    // Skip M:N navigation property for Garage-Vehicle relationship
    public ICollection<VehicleBase> Vehicles { get; } = [];
    
    public ICollection<GarageInventory> GarageInventories { get; } = [];

    #endregion
}