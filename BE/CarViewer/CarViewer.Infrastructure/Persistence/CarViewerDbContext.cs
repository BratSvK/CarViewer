using System.Reflection;
using CarViewer.Domain.Entities.Auth;
using Microsoft.EntityFrameworkCore;

namespace CarViewer.Infrastructure.Persistence;

/// <summary>
/// Authorization database context.
/// </summary>
public class CarViewerDbContext : DbContext
{
    /// <summary>
    /// ctor.
    /// </summary>
    /// <param name="options">Database configuration options.</param>
    public CarViewerDbContext(DbContextOptions<CarViewerDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<User> Users { get; set; }
    
    public virtual DbSet<Role> Roles { get; set; }
    
    public virtual DbSet<UserRole> UserRoles { get; set; }
    
    public virtual DbSet<UserClaim> UserClaims { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}