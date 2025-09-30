using CarViewer.Application.Mediator;
using CarViewer.Configuration;
using CarViewer.Infrastructure.Extensions;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddBaseApplicationService(builder);
builder.Services.AddIdentityService(builder.Configuration);
builder.Services.AddCarViewerDbContext(builder.Configuration);
builder.Services.AddMediator();
builder.Services.AddNamedHttpClients();
builder.Services.AddLoggerService(builder.Configuration);
builder.Services.AddControllers();

builder.Host.UseSerilog(Log.Logger);

var app = builder.Build();

// app.UseHttpsRedirection();
app.MapControllers();
app.UseSerilogRequestLogging();
app.Run();