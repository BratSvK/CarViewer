using CarViewer.Application.Mediator.Commands;
using CarViewer.Application.Mediator.Queries;

namespace CarViewer.Application.Mediator;

public interface IDispatcher
{
    Task<TResponse> QueryAsync<TResponse>(IQuery<TResponse> query, CancellationToken cancellationToken = default);
    Task<TResponse> SendAsync<TResponse>(ICommand<TResponse> request, CancellationToken cancellationToken = default);
}