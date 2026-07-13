using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi;

namespace CurrencyConverter.Api.Extensions;

/// <summary>
/// Extension methods for configuring Swagger/OpenAPI with JWT Bearer support.
/// </summary>
public static class SwaggerExtensions
{
    /// <summary>
    /// Adds Swagger generation with JWT Bearer authentication options.
    /// </summary>
    public static IServiceCollection AddSwaggerAuthentication(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Currency Converter API",
                Version = "v1",
                Description = "Currency Converter API with JWT Authentication and Clean Architecture."
            });

            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below. Example: 'Bearer 12345abcdef'",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT"
            });

            options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
            {
                [new OpenApiSecuritySchemeReference("Bearer", document)] = new List<string>()
            });
        });

        return services;
    }
}
