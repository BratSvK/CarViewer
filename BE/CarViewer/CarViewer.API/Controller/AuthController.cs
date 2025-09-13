using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using CarViewer.Application.Features.Auth.Commands;
using CarViewer.Extensions;
using CarViewer.Application.Features.Demo.Queries;
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
    
    // [HttpGet("login")]
    // [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoggedUserDTO))]
    // [ProducesResponseType(StatusCodes.Status400BadRequest)]
    // public async Task<IActionResult> Login()
    // {
    //     Request.Headers.TryGetValue("Authorization", out var authorization);
    //     var credentials = AuthorizationHelper.GetCredentials(authorization);
    //
    //     return Ok(await this.SendRequest(new LoginUser.Command(credentials.Key, credentials.Value)));
    // }
    
    [HttpPost("demo")]
    [TranslateResultToActionResult]
    [ProducesResponseType(StatusCodes.Status200OK,  Type = typeof(DemoTest.Response))]
    public async Task<Result<DemoTest.Response>> Demo([FromBody] string payload)
    {
        // Your logic here
        string demoText = $"Received: {payload}";
        var res = await this.SendRequest((new DemoTest.DemoTestQuery(demoText)));
        
        return Result.Success(res.Value);
    }
}