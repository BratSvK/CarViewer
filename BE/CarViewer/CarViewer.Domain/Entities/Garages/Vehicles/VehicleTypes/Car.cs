using CarViewer.Domain.Enums;

namespace CarViewer.Domain.Entities.Garages.Vehicles.VehicleTypes;

public sealed class Car : VehicleBase
{
    public CarType CarType { get; init; }
}