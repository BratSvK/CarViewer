using CarViewer.Application.Mediator.Queries;

namespace CarViewer.Application.Features.Demo;

public static class DemoTestQuery
{
    public record Response(string ResponseText);
    
    public record Query(string DemoText) : IQuery<Response>;
    
    internal class Handler : IQueryHandler<Query, Response>
    {
        public async Task<Response> HandleAsync(Query query, CancellationToken cancellationToken)
        {
            var response = new Response($"From query handler using Mediator and Dispatcher {query.DemoText}");
            
            return await Task.FromResult(response);
        }
    }
}