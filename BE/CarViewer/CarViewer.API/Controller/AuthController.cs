using CarViewer.Extensions;
using CarViewer.Application.Features.Demo;
using Microsoft.AspNetCore.Mvc;

namespace CarViewer.Controller;

public class AuthController : BaseController
{
    // [HttpPost("register")]
    // [ProducesResponseType(StatusCodes.Status201Created)]
    // [ProducesResponseType(StatusCodes.Status400BadRequest)]
    // public async Task<IActionResult> RegisterUser(RegisterUser.Command registerUser)
    //     => await this.SendCreateCommand(registerUser);
    
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
    [ProducesResponseType(StatusCodes.Status200OK,  Type = typeof(DemoTestQuery.Response))]
    public async Task<IActionResult> Demo([FromBody] string payload)
    {
        // Your logic here
        string demoText = $"Received: {payload}";
        DemoTestQuery.Response response = await this.SendRequest((new DemoTestQuery.Query(demoText)));
        
        return Ok(response);
    }
}