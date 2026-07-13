namespace CurrencyConverter.Applicatio.DTOs;

/// <summary>
/// DTO representing a login request.
/// </summary>
public class LoginRequest
{
    /// <summary>
    /// Gets or sets the username credentials.
    /// </summary>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the password credentials.
    /// </summary>
    public string Password { get; set; } = string.Empty;
}
