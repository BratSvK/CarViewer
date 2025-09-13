using CarViewer.Application.Interfaces.Repositories;
using CarViewer.Infrastructure.Persistence;

namespace CarViewer.Infrastructure.Repositories;

internal class UnitOfWork : IUnitOfWork
{
    private readonly CarViewerDbContext _dbContext;

    public UnitOfWork(CarViewerDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return _dbContext.SaveChangesAsync(cancellationToken);
    }
}