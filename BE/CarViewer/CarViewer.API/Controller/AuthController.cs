using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using CarViewer.Application.DTO.Auth;
using CarViewer.Application.Features.Auth.Commands;
using CarViewer.Extensions;
using CarViewer.Application.Features.Demo.Queries;
using CarViewer.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace CarViewer.Controller;

public class AuthController : BaseController
{
    [HttpPost("register")]
    [TranslateResultToActionResult]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<Result<Guid>> RegisterUser(RegisterUser.RegisterUserCommand registerUser)
        => await this.SendCreateCommand(registerUser);
    
    [HttpGet("login")]
    [TranslateResultToActionResult]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoggedUserDTO))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<Result<bool>> RegisterUser(Guid userId)
        => await this.SendCreateCommand(new RemoveUser.RemoveUserCommand(userId));
    
    [HttpPost("demo")]
    [TranslateResultToActionResult]
    [ProducesResponseType(StatusCodes.Status200OK,  Type = typeof(DemoTest.Response))]
    public async Task<Result<DemoTest.Response>> Demo([FromBody] string payload)
    {
        // Your logic here
        string demoText = $"Received: {payload}";
        var res = await this.SendRequest(new DemoTest.DemoTestQuery(demoText));
        
        return Result.Success(res);
    }
}