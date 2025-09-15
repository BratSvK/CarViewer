using CarViewer.Application.Interfaces.Repositories;
using CarViewer.Infrastructure.Persistence;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace CarViewer.Infrastructure.Repositories;

internal abstract class BaseRepository<T, TKey> : IBaseRepository<T, TKey> where T : class
{
    protected readonly CarViewerDbContext DbContext;

    protected BaseRepository(CarViewerDbContext dbContext)
    {
        DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public async Task<T?> GetAsync(TKey id, CancellationToken cancellationToken) =>
        await DbContext.Set<T>().FindAsync([id], cancellationToken);

    public async Task<TO?> GetAsync<TO>(TKey id, CancellationToken cancellationToken = default) 
        where TO : IProjectionEntity =>
        await DbContext.Set<T>()
            .AsNoTracking()
            .ProjectToType<TO>()
            .FirstOrDefaultAsync(cancellationToken);

    public async Task<IReadOnlyList<T>> GetAllAsync(CancellationToken cancellationToken) =>
        await DbContext.Set<T>().ToListAsync(cancellationToken);

    public async Task<IReadOnlyList<TO>> GetAllAsync<TO>(CancellationToken cancellationToken)
        where TO : IProjectionEntity => 
        await DbContext.Set<T>().AsNoTracking().ProjectToType<TO>().ToListAsync(cancellationToken);

    public async Task<bool> ExistsAsync(TKey id, CancellationToken cancellationToken = default) =>
        await GetAsync(id, cancellationToken) != null;

    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken)
    {
        await DbContext.AddAsync(entity, cancellationToken);

        return entity;
    }

    public void Update(T entity)
    {
        DbContext.Entry(entity).State = EntityState.Modified;
    }

    public void Delete(T entity)
    {
        DbContext.Set<T>().Remove(entity);
    }
}