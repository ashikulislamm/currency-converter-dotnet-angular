using CurrencyConverter.Api.Extensions;
using CurrencyConverter.Api.Middlewares;
using CurrencyConverter.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Custom Swagger config with Bearer authentication
builder.Services.AddSwaggerAuthentication();

// Configure CORS for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Default Angular port
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure Infrastructure & Application Layer Dependencies
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<GlobalExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Currency Converter API v1");
    });
}

app.UseHttpsRedirection();

// Apply CORS Policy
app.UseCors("CorsPolicy");

// Authentication & Authorization Middlewares
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

app.Run();
