using System.Reflection;
using CarViewer.Domain.Entities.Auth;
using CarViewer.Domain.Entities.Garages;
using CarViewer.Domain.Entities.Garages.Vehicles;
using CarViewer.Domain.Entities.Garages.Vehicles.VehicleTypes;
using Microsoft.EntityFrameworkCore;

namespace CarViewer.Infrastructure.Persistence;

public class CarViewerDbContext : DbContext
{
    public CarViewerDbContext(DbContextOptions<CarViewerDbContext> options)
        : base(options)
    {
    }

    # region Auth Entities
    public virtual DbSet<User> Users { get; set; } = null!;
    
    public virtual DbSet<Role> Roles { get; set; } = null!;
    
    public virtual DbSet<UserRole> UserRoles { get; set; } = null!;
    
    public virtual DbSet<UserClaim> UserClaims { get; set; } = null!;
    # endregion
    # region Garage Entities
    public DbSet<Garage> Garages { get; set; } = null!;
    
    public DbSet<VehicleBase> Vehicles { get; set; } = null!;
    
    public DbSet<Car> Cars { get; set; } = null!;
    
    public DbSet<VehiclePhoto> VehiclePhotos { get; set; } = null!;
    
    public DbSet<GarageInventory> GarageInventories { get; set; } = null!;
    # endregion
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}