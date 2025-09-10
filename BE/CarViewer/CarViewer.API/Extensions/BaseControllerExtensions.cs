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
    /// <param name="actionName">Action name to specify URI at which the content has been created.</param>
    /// <returns><see cref="CreatedResult"/> with resource id and location.</returns>
    public static async Task<CreatedResult> SendCreateCommand<TResponse>(
        this ControllerBase controller,
        ICommand<TResponse> command,
        string? actionName = null)
    {
        var ret = new { id = await controller.Mediator().SendAsync(command) };
        var url = actionName is not null
            ? controller.Url.Link(actionName, ret) ?? string.Empty
            : string.Empty;

        return controller.Created(url, ret);
    }
    
    private static IDispatcher Mediator(this ControllerBase controller)
        => (IDispatcher)controller.HttpContext.RequestServices.GetService(typeof(IDispatcher))!;
}