using CarViewer.Application.Mediator.Queries;

namespace CarViewer.Application.Features.Demo.Queries;

public static class DemoTest
{
    public record Response(string ResponseText);
    
    public record DemoTestQuery(string DemoText) : IQuery<Response>;
    
    internal class Handler : IQueryHandler<DemoTestQuery, Response>
    {
        public async Task<Response> HandleAsync(DemoTestQuery query, CancellationToken cancellationToken)
        {
            var response = new Response($"From query handler using Mediator and Dispatcher {query.DemoText}");
            
            return await Task.FromResult(response);
        }
    }
}