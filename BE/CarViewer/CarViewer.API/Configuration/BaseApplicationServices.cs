using System.Reflection;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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
    
    public static IServiceCollection AddIdentityService(this IServiceCollection services, IConfiguration config)
    {
        services.AddAuthorization();
        // service for authentication
        services.AddAuthentication()
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, jwtOptions =>
            {
                jwtOptions.Authority = config["Authentication:ValidIssuer"];
                jwtOptions.Audience = config["Authentication:Audience"];
                jwtOptions.TokenValidationParameters.ValidIssuer = config["Authentication:ValidIssuer"];
            });

        return services;
    }
}