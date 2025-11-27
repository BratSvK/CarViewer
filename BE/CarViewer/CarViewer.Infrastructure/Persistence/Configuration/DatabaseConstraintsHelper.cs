namespace CarViewer.Infrastructure.Persistence.Configuration;

internal static class DatabaseConstraintsHelper
{
    public const int ImageUrlMaxLenght = 1024;
    
    public const int GarageNameMaxLenght = 20;
    
    public const string SqlServerDefaultGuidValue = "NEWID()";
    
    public const string SqlServerDefaultDateTimeValue = "GETUTCDATE()";
    public static int VehicleBrandMaxLenght => 100;
    public static int VehicleVinMaxLenght => 17;
    
    public static int VehicleTypeMaxLenght => 50;
    
    public static int VehicleTypeDiscriminatorMaxLenght => 50;
}