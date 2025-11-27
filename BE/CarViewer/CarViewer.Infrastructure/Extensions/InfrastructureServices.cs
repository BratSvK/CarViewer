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
    // <summary>
    /// Adds base services.
    /// </summary>
    /// <param name="services">IoC container.</param>
    /// <returns>Services.</returns>
    public static IServiceCollection AddNamedHttpClients(this IServiceCollection services)
    {
        services.AddHttpClient<IJwtTokenProvider, JwtTokenProvider>((sp, client) =>
        {
            var config = sp.GetRequiredService<IConfiguration>();
            client.BaseAddress = new Uri(config["Authentication:TokenUri"]!);
        });

        return services;
    }

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
        => services
            .AddScoped<IUnitOfWork, UnitOfWork>()   
            .AddScoped<IUserRepository, UserRepository>();

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
    
    public static IServiceCollection AddSupebaseStorageService(
        this IServiceCollection services,
        IConfiguration config)
    {
        services.AddScoped<Supabase.Client>(_ =>
        {
            string supabaseUrl = config["Supabase:Url"]!;
            string supabaseKey = config["Supabase:Key"]!;
            var supabseOptions = new Supabase.SupabaseOptions
            {
                AutoRefreshToken = true,
                AutoConnectRealtime = true,
            };
            
            return new Supabase.Client(supabaseUrl, supabaseKey, supabseOptions);
        });

        return services;
    }
}