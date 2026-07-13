using System.Net;
using System.Text.Json;
using CurrencyConverter.Applicatio.Common.Exceptions;
using CurrencyConverter.Applicatio.DTOs;

namespace CurrencyConverter.Api.Middlewares;

/// <summary>
/// Global middleware to intercept all exceptions, log them, and return a consistent JSON response structure.
/// </summary>
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    /// <summary>
    /// Initializes a new instance of the <see cref="GlobalExceptionMiddleware"/> class.
    /// </summary>
    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    /// <summary>
    /// Invokes the middleware to execute the HTTP context pipeline request.
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred during request execution.");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var statusCode = HttpStatusCode.InternalServerError;
        var message = "An unexpected error occurred. Please try again later.";

        if (exception is AuthenticationException authEx)
        {
            statusCode = HttpStatusCode.Unauthorized;
            message = authEx.Message;
        }
        else if (exception is ValidationException valEx)
        {
            statusCode = HttpStatusCode.BadRequest;
            message = valEx.Message;
        }
        else if (exception is HttpRequestException)
        {
            statusCode = HttpStatusCode.BadGateway;
            message = "External currency rates service returned an error or was unreachable.";
        }

        context.Response.StatusCode = (int)statusCode;

        var response = ApiResponse.FailureResponse(message);
        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        await context.Response.WriteAsync(json);
    }
}
