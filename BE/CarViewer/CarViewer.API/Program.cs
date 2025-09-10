using CarViewer.Application.Mediator;
using CarViewer.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddBaseApplicationService(builder);
builder.Services.AddMediator();
builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();