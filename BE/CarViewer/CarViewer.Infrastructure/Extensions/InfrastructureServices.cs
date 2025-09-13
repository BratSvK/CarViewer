using CarViewer.Application.Interfaces.Repositories;
using CarViewer.Application.Interfaces.Services;
using CarViewer.Domain.Entities.Auth;
using CarViewer.Infrastructure.Persistence;
using CarViewer.Infrastructure.Repositories;
using CarViewer.Infrastructure.Services;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;

namespace CarViewer.Infrastructure.Extensions;

public static class InfrastructureServices
{
    public static IServiceCollection AddCarViewerDbContext(
        this IServiceCollection services,
        IConfiguration config)
    {
        services.AddDbContext<CarViewerDbContext>(options =>
        {
            options.UseSqlServer(config.GetConnectionString("Authorization"))
                .LogTo(Log.Logger.Information, LogLevel.Information, null);
        });

        services.AddIdentityService(config);
        services.AddFirebaseService(config);
        services.AddSingleton<IAuthenticationService, FirebaseService>();
        services.AddRepositories();

        return services;
    }
    
    private static IServiceCollection AddIdentityService(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddIdentityCore<User>(o => { o.SignIn.RequireConfirmedEmail = true; })
            .AddRoles<Role>()
            .AddRoleManager<RoleManager<Role>>()
            .AddRoleValidator<RoleValidator<Role>>()
            .AddEntityFrameworkStores<CarViewerDbContext>();

        return services;
    }

    private static IServiceCollection AddRepositories(this IServiceCollection services)
        => services.AddScoped<IUserRepository, UserRepository>();

    private static IServiceCollection AddFirebaseService(
        this IServiceCollection services,
        IConfiguration config)
    {
        FirebaseApp.Create(new AppOptions
        {
            Credential = GoogleCredential.FromFile(config["Credentials:Firebase:Path"])
        });

        return services;
    }
}