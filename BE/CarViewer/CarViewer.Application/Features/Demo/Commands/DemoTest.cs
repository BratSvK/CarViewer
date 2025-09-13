using CarViewer.Application.Mediator.Commands;
using Microsoft.Extensions.Logging;

namespace CarViewer.Application.Features.Demo.Commands;

public static class DemoTest
{
    public record DemoTestCommand(string DemoText) : ICommand<Guid>;

    internal class Handler : ICommandHandler<DemoTestCommand, Guid>
    {
        private readonly ILogger<Handler> _logger;

        public Handler(ILogger<Handler> logger)
        {
            _logger = logger;
        }
    
        public async Task<Guid> HandleAsync(DemoTestCommand command, CancellationToken cancellationToken)
        {
            var generatedGuid = Guid.NewGuid();
            _logger.LogInformation("Generated GUID: {GeneratedGuid}", generatedGuid);
        
            return await Task.FromResult(generatedGuid);
        }
    }
}