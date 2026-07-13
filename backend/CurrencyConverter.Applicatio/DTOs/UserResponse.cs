namespace CurrencyConverter.Applicatio.DTOs;

/// <summary>
/// DTO representing user profile information.
/// </summary>
public class UserResponse
{
    /// <summary>
    /// Gets or sets the username of the user.
    /// </summary>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the display name of the user.
    /// </summary>
    public string DisplayName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the role of the user.
    /// </summary>
    public string Role { get; set; } = string.Empty;
}
