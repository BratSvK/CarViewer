using CarViewer.Application.Mediator.Command;
using Microsoft.Extensions.Logging;

namespace CarViewer.Application.Features.Demo;

public static class DemoTestCommand
{
    public record Command(string DemoText) : ICommand<Guid>;

    internal class Handler : ICommandHandler<Command, Guid>
    {
        private readonly ILogger<Handler> _logger;

        public Handler(ILogger<Handler> logger)
        {
            _logger = logger;
        }
    
        public async Task<Guid> HandleAsync(Command command, CancellationToken cancellationToken)
        {
            var generatedGuid = Guid.NewGuid();
            _logger.LogInformation("Generated GUID: {GeneratedGuid}", generatedGuid);
        
            return await Task.FromResult(generatedGuid);
        }
    }
}