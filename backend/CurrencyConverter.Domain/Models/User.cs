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
}
