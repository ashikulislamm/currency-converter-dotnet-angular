namespace CurrencyConverter.Infrastructure.Options;

/// <summary>
/// Strong-typed options configuration class for JWT settings.
/// </summary>
public class JwtSettings
{
    /// <summary>
    /// The default configuration section name.
    /// </summary>
    public const string SectionName = "JwtSettings";

    /// <summary>
    /// Gets or sets the signing security key.
    /// </summary>
    public string Secret { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the issuer (iss) claim value.
    /// </summary>
    public string Issuer { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the audience (aud) claim value.
    /// </summary>
    public string Audience { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the lifetime duration in minutes.
    /// </summary>
    public int ExpirationInMinutes { get; set; }
}
