using System.Reflection;

namespace CarViewer.Configuration;

public static class BaseApplicationServices
{
    /// <summary>
    /// Configure logging service.
    /// </summary>
    public static IServiceCollection AddBaseApplicationService(
        this IServiceCollection services,
        WebApplicationBuilder builder)
    {
        builder.Configuration
            .SetBasePath(builder.Environment.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true,
                reloadOnChange: true)
            .AddUserSecrets(Assembly.GetExecutingAssembly(), optional: true)
            .AddEnvironmentVariables(); // overwrites previous values from EnvironmentVariables

        if (builder.Environment.IsDevelopment())
        {
            builder.Configuration.AddJsonFile("appsettings.local.json", optional: true,
                reloadOnChange: true);
        }
        
        return services;
    }
}