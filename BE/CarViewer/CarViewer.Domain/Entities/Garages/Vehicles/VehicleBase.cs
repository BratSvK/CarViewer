using CarViewer.Domain.Enums;

namespace CarViewer.Domain.Entities.Garages.Vehicles;

public abstract class VehicleBase : IEntity
{
    public Guid Id { get; } = Guid.NewGuid();
    
    public required string Brand { get; init; }
    
    public int Year { get; init; }
    
    public required string VIN { get; init; }

    public double FuelConsumption { get; init; }
    
    public GasType GasType { get; init; }
    
    public double EngineVolume { get; init; }
    
    public EngineType EngineType { get; init; }

    /// <summary>
    /// Engine model as a combination of engine volume and engine type.
    /// e.g., "2.0L TDI"
    /// </summary>
    public string EngineModel => $"{EngineVolume}L {EngineType}";
    
    #region Relationships

    public ICollection<VehiclePhoto> VehiclePhotos { get; } = [];
    
    // Skip M:N navigation property for Garage-Vehicle relationship
    public ICollection<Garage> Garages { get; } = [];
    
    public ICollection<GarageInventory> GarageInventories { get; } = [];

    #endregion
}