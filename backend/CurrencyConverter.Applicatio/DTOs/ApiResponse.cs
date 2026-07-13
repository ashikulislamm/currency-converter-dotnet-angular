namespace CurrencyConverter.Applicatio.DTOs;

/// <summary>
/// A standardized wrapper for all API response payloads containing data.
/// </summary>
/// <typeparam name="T">Type of the returned data.</typeparam>
public class ApiResponse<T>
{
    /// <summary>
    /// Gets or sets a value indicating whether the request was successful.
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// Gets or sets the response status message or details.
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the payload data.
    /// </summary>
    public T? Data { get; set; }

    /// <summary>
    /// Factory method for creating a successful response.
    /// </summary>
    public static ApiResponse<T> SuccessResponse(T data, string message = "Success") =>
        new() { Success = true, Message = message, Data = data };

    /// <summary>
    /// Factory method for creating a failed response.
    /// </summary>
    public static ApiResponse<T> FailureResponse(string message) =>
        new() { Success = false, Message = message, Data = default };
}

/// <summary>
/// A standardized wrapper for empty API response payloads (e.g., status or errors only).
/// </summary>
public class ApiResponse
{
    /// <summary>
    /// Gets or sets a value indicating whether the request was successful.
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// Gets or sets the response status message or details.
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Factory method for creating a successful empty response.
    /// </summary>
    public static ApiResponse SuccessResponse(string message = "Success") =>
        new() { Success = true, Message = message };

    /// <summary>
    /// Factory method for creating a failed empty response.
    /// </summary>
    public static ApiResponse FailureResponse(string message) =>
        new() { Success = false, Message = message };
}
