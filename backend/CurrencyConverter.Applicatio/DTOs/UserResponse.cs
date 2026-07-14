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

    /// <summary>
    /// Gets or sets the email of the user.
    /// </summary>
    public string? Email { get; set; }

    /// <summary>
    /// Gets or sets the profile picture URL of the user.
    /// </summary>
    public string? ProfilePicture { get; set; }

    /// <summary>
    /// Gets or sets the authentication provider (e.g., Local, Google).
    /// </summary>
    public string Provider { get; set; } = "Local";

    /// <summary>
    /// Gets or sets the login method description.
    /// </summary>
    public string LoginMethod { get; set; } = "Local Credentials";
}
