using Supabase.Storage.Exceptions;
using FileOptions = Supabase.Storage.FileOptions;

namespace CarViewer.Infrastructure.Services;

using Supabase;
using System.Threading.Tasks;

public sealed class SupabaseStorageService
{
    private readonly Client _supabase;

    public SupabaseStorageService(Client client)
    {
        _supabase = client;
    }
        
    public async Task<string> UploadGarageImageAsync(byte[] imageBytes, string fileName)
    {
        try
        {
            var remotePath = $"garage/{fileName}";
            await _supabase.Storage
                .From("images")
                .Upload(imageBytes, remotePath, new FileOptions() { Upsert = true });

            var publicUrl = _supabase.Storage
                .From("images")
                .GetPublicUrl(remotePath);

            return publicUrl;
        }
        catch (SupabaseStorageException ex)
        {
            Console.WriteLine($"Supabase Storage Error: {ex.Message}");
            throw;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error uploading to Supabase: {ex.Message}");
            throw;
        }
    }
}