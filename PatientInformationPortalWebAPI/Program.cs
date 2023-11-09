using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PatientInformationPortalWebAPI.DAL;
using PatientInformationPortalWebAPI.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Set up configuration
//var configuration = new ConfigurationBuilder()
//    .SetBasePath(builder.Environment.ContentRootPath)
//    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
//    .AddEnvironmentVariables()
//    .Build();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<PatientDbContext>(options =>
options.UseSqlServer(AppConfig.DefaultConnection));
builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add MediatR to the services
//builder.Services.AddMediatR();
var app = builder.Build();
app.UseCors(policy => policy.AllowAnyHeader()
.AllowAnyMethod()
.SetIsOriginAllowed(origin => true)
.AllowCredentials());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
