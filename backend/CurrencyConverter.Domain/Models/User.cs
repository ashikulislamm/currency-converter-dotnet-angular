namespace CurrencyConverter.Domain.Models;

/// <summary>
/// Domain model representing a user in the system.
/// </summary>
public class User
{
    /// <summary>
    /// Gets or sets the unique username for login identification.
    /// </summary>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the plain-text password for credential matching.
    /// </summary>
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the name shown in the UI.
    /// </summary>
    public string DisplayName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the role of the user (e.g., Admin, User).
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
