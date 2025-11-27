using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Features.Auth.Commands;
using CarViewer.Extensions;
using CarViewer.Application.Features.Demo.Queries;
using CarViewer.Helpers;
using CarViewer.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Supabase;

namespace CarViewer.Controller;

public class AuthController : BaseController
{
    private readonly Client _supabaseClient;

    public AuthController(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }
    
    [HttpPost("register")]
    [TranslateResultToActionResult]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<Result<Guid>> RegisterUser(RegisterUser.RegisterUserCommand registerUser)
        => await this.SendCreateCommand(registerUser);
    
    [HttpGet("login")]
    [TranslateResultToActionResult]
    public async Task<Result<LoggedUserDTO>> Login()
    {
        Request.Headers.TryGetValue("Authorization", out var authorization);
        Result<KeyValuePair<string, string>> credentials = RequestHeaderHelper.GetCredentials(authorization);
    
        if (!credentials.IsSuccess)
        {
            return Result.Unauthorized();
        }

        var request = new LoginUser.LoginUserCommand(
            Email: credentials.Value.Key,
            Password: credentials.Value.Value);
        
        return await this.SendCreateCommand(request);
    }
    
    [HttpDelete("{userId:guid}")]
    [TranslateResultToActionResult]
    public async Task<Result<bool>> RegisterUser(Guid userId)
        => await this.SendCreateCommand(new RemoveUser.RemoveUserCommand(userId));

    #region  Testing Purpose Only
    
    [HttpPost("demo")]
    [TranslateResultToActionResult]
    [ProducesResponseType(StatusCodes.Status200OK,  Type = typeof(DemoTest.Response))]
    public async Task<Result<DemoTest.Response>> Demo([FromBody] string payload)
    {
        // Your logic here
        string demoText = $"Received: {payload}";
        var res = await this.SendRequest(new DemoTest.DemoTestQuery(demoText));
        
        var result =  Result.Success(res);

        return result;
    }
    
    [HttpPost("uploadTest")]
    [TranslateResultToActionResult]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<Result<string>> UploadGarageImage(IFormFile imageFile)
    {
        if (imageFile.Length == 0)
        {
            return Result.Error("Image file is required.");
        }
        
        var storageService = new SupabaseStorageService(_supabaseClient);

        await using var memoryStream = new MemoryStream();
        await imageFile.CopyToAsync(memoryStream);
        byte[] imageBytes = memoryStream.ToArray();

        var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";

        string imageUrl = await storageService.UploadGarageImageAsync(imageBytes, uniqueFileName);

        return Result.Success(imageUrl);
    }
    
    #endregion
}