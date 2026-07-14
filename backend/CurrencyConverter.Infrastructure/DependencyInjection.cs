using System.Text;
using CurrencyConverter.Applicatio.Interfaces;
using CurrencyConverter.Applicatio.Services;
using CurrencyConverter.Infrastructure.JWT;
using CurrencyConverter.Infrastructure.Options;
using CurrencyConverter.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

using CurrencyConverter.Infrastructure.External;
using System;

namespace CurrencyConverter.Infrastructure;

/// <summary>
/// Dependency Injection extension methods for the Infrastructure layer.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Adds infrastructure and authentication services to the service container.
    /// </summary>
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Configure strongly typed settings using Options pattern
        services.Configure<JwtSettings>(
            configuration.GetSection(JwtSettings.SectionName));
        services.Configure<UserCredentialsSettings>(
            configuration.GetSection(UserCredentialsSettings.SectionName));
        services.Configure<CurrencyApiSettings>(
            configuration.GetSection(CurrencyApiSettings.SectionName));

        // Register application services
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ICurrencyService, CurrencyService>();

        // Register infrastructure services
        services.AddScoped<IUserCredentialsProvider, UserCredentialsProvider>();
        services.AddScoped<IJwtService, JwtService>();

        // Configure Typed HttpClient for Currency API
        var currencyApiSection = configuration.GetSection(CurrencyApiSettings.SectionName);
        var baseUrl = currencyApiSection.GetValue<string>(nameof(CurrencyApiSettings.BaseUrl)) ?? "https://api.frankfurter.app/";
        var timeoutSeconds = currencyApiSection.GetValue<int?>(nameof(CurrencyApiSettings.TimeoutSeconds)) ?? 15;

        services.AddHttpClient<ICurrencyApiClient, CurrencyApiClient>(client =>
        {
            client.BaseAddress = new Uri(baseUrl);
            client.Timeout = TimeSpan.FromSeconds(timeoutSeconds);
        });

        // Fetch JWT secret to configure authentication middleware
        var jwtSection = configuration.GetSection(JwtSettings.SectionName);
        var secret = jwtSection.GetValue<string>(nameof(JwtSettings.Secret));
        var issuer = jwtSection.GetValue<string>(nameof(JwtSettings.Issuer));
        var audience = jwtSection.GetValue<string>(nameof(JwtSettings.Audience));

        if (!string.IsNullOrEmpty(secret))
        {
            var key = Encoding.UTF8.GetBytes(secret);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddCookie("GoogleCookie")
            .AddGoogle(options =>
            {
                options.ClientId = configuration["Authentication:Google:ClientId"] ?? string.Empty;
                options.ClientSecret = configuration["Authentication:Google:ClientSecret"] ?? string.Empty;
                options.SignInScheme = "GoogleCookie";
                options.CallbackPath = "/signin-google"; // Default intercept path
                options.ClaimActions.MapJsonKey("urn:google:picture", "picture");
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // Set to true in real production environment
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ClockSkew = TimeSpan.Zero
                };
            });
        }

        return services;
    }
}
