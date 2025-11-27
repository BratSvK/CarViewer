namespace CarViewer.Domain.Entities;

public interface IImageEntity : IEntity
{
    public Guid Id { get; }
    
    /// <summary>
    /// The URL of the image stored in the CDN.
    /// </summary>
    public string ImageUrl { get; set; }
}