using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CarViewer.Persistence.Extensions;

namespace CarViewer.Application.Extensions;

public static class ApplicationServices
{
    public static IServiceCollection AddApplicationDatabase(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.AddCarViewerDbContext(configuration);

        return services;
    }
}