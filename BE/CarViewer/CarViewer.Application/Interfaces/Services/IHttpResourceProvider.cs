namespace CarViewer.Application.Interfaces.Services;

/// <summary>
/// Interface describing resource provider in service discovery.
/// </summary>
public interface IHttpResourceProvider
{
    /// <summary>
    /// HttpClient name that use for this provider.
    /// </summary>
    string ClientName { get; set; }

    /// <summary>
    /// Gets resources from specified url with a body.
    /// </summary>
    /// <typeparam name="TRequestBody">Request body type.</typeparam>
    /// <typeparam name="TResponse">Response type.</typeparam>
    /// <param name="url">Url.</param>
    /// <param name="queryBody">Query body.</param>
    /// <returns>Resource object.</returns>
    Task<TResponse> GetResourceAsync<TRequestBody, TResponse>(string url, TRequestBody queryBody);


    /// <summary>
    /// Sends request to specified url.
    /// </summary>
    /// <typeparam name="TRequestBody">Request body type.</typeparam>
    /// <typeparam name="TResponse">Response type.</typeparam>
    /// <param name="url">Url.</param>
    /// <param name="requestBody">Request body object.</param>
    /// <param name="cancellationToken">Token</param>
    /// <returns>Response object.</returns>
    Task<TResponse> PostResourceAsync<TRequestBody, TResponse>(string url, TRequestBody requestBody,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Delete resource identified by a resource key, using a service API client.
    /// </summary>
    /// <param name="url">Url path</param>
    /// <param name="resourceKey">Resource key to append to url.</param>
    Task DeleteResourceAsync(
        string url,
        object resourceKey);
}