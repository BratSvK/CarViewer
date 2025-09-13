using CarViewer.Application.Extensions;
using CarViewer.Application.Mediator;
using CarViewer.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddBaseApplicationService(builder);
builder.Services.AddIdentityService(builder.Configuration);
builder.Services.AddApplicationDatabase(builder.Configuration);
builder.Services.AddMediator();
builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();