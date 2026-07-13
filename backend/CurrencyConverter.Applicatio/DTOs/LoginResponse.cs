namespace CurrencyConverter.Applicatio.DTOs;

/// <summary>
/// DTO representing the response returned upon successful authentication.
/// </summary>
public class LoginResponse
{
    /// <summary>
    /// Gets or sets the generated JSON Web Token (JWT).
    /// </summary>
    public string Token { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the details of the logged in user.
    /// </summary>
    public UserResponse User { get; set; } = new();
}
