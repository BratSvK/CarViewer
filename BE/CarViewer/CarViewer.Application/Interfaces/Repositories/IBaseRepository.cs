namespace CarViewer.Application.Interfaces.Repositories;

public interface IBaseRepository<T, in TKey> where T : class
{
    Task<T?> GetAsync(TKey id, CancellationToken cancellationToken = default);

    Task<TO?> GetAsync<TO>(TKey id, CancellationToken cancellationToken = default)
        where TO : IProjectionEntity;

    Task<IReadOnlyList<T>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<IReadOnlyList<TO>> GetAllAsync<TO>(CancellationToken cancellationToken = default) 
        where TO : IProjectionEntity;

    Task<bool> ExistsAsync(TKey id, CancellationToken cancellationToken = default);

    Task<T> AddAsync(T entity, CancellationToken cancellationToken = default);
    
    void Update(T entity);

    void Delete(T entity);
}