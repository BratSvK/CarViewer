using CarViewer.Application.Features;
using CarViewer.Application.Mediator;
using CarViewer.Application.Mediator.Command;
using Microsoft.Extensions.DependencyInjection;

namespace CarViewer.Application.Extensions;

public static class ApplicationServices
{
    public static IServiceCollection AddMediator(this IServiceCollection services)
    {
        services.Scan(scan => scan
            .FromAssembliesOf(typeof(ApplicationServices))
            .AddClasses(classes => classes.AssignableTo(typeof(ICommandHandler<,>)), publicOnly: false)
            .AsImplementedInterfaces()
            .WithScopedLifetime()
            .AddClasses(classes => classes.AssignableTo(typeof(IQueryHandler<,>)), publicOnly: false)
            .AsImplementedInterfaces()
            .WithScopedLifetime()
        );
        
        return services;
    }
}