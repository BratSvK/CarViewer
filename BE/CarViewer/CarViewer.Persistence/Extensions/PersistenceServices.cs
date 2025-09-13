using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarViewer.Persistence.Extensions;

public static class PersistenceServices
{
    public static IServiceCollection AddCarViewerDbContext(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Authorization");

        services.AddDbContextPool<CarViewerDbContext>(options =>
            options.UseSqlServer(connectionString));

        return services;
    }
}