using CurrencyConverter.Domain.Models;

namespace CurrencyConverter.Infrastructure.Options;

/// <summary>
/// Strong-typed options configuration class for holding valid user credentials.
/// </summary>
public class UserCredentialsSettings
{
    /// <summary>
    /// The default configuration section name.
    /// </summary>
    public const string SectionName = "UserCredentials";

    /// <summary>
    /// Gets or sets the list of configured users.
    /// </summary>
    public List<User> Users { get; set; } = new();
}
