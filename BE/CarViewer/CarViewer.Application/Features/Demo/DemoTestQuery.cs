using CarViewer.Application.Mediator;

namespace CarViewer.Application.Features.Demo;

public static class DemoTestQuery
{
    public record DemoTestResponse(string ResponseText);
    
    public record Query(string DemoText) : IQuery<DemoTestResponse>;
    
    internal class Handler : IQueryHandler<Query, DemoTestResponse>
    {
        public async Task<DemoTestResponse> HandleAsync(Query query, CancellationToken cancellationToken)
        {
            var demoText = $"Received: {query.DemoText}";
            var response = new DemoTestResponse(demoText);
            
            return await Task.FromResult(response);
        }
    }
}