using Ardalis.Result;
using CarViewer.Application.Mediator;
using CarViewer.Application.Mediator.Queries;
using CarViewer.Application.Mediator.Commands;
using Microsoft.AspNetCore.Mvc;

namespace CarViewer.Extensions;

public static class BaseControllerExtensions
{
    /// <summary>
    /// Send <paramref name="request"/> through <see cref="IMediator"/>.
    /// </summary>
    /// <typeparam name="TResponse">Response type.</typeparam>
    /// <param name="controller">Controller.</param>
    /// <param name="request">Request.</param>
    /// <returns>Response from request.</returns>
    public static async Task<TResponse> SendRequest<TResponse>(
        this ControllerBase controller,
        IQuery<TResponse> request)
        => await controller.Mediator().QueryAsync(request);

    /// <summary>
    /// Send command for create resource.
    /// </summary>
    /// <typeparam name="TResponse">Type of command response. This response is used as id for response to the client.</typeparam>
    /// <param name="controller">Controller.</param>
    /// <param name="command">Create command.</param>
    /// <returns><see cref="CreatedResult"/> Result object</returns>
    public static async Task<TResponse> SendCreateCommand<TResponse>(
        this ControllerBase controller,
        ICommand<TResponse> command) 
        => await controller.Mediator().SendAsync(command);

    private static IDispatcher Mediator(this ControllerBase controller)
        => (IDispatcher)controller.HttpContext.RequestServices.GetService(typeof(IDispatcher))!;
}