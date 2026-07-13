namespace CurrencyConverter.Infrastructure.Options;

/// <summary>
/// Options pattern class representing external Currency API configuration settings.
/// </summary>
public class CurrencyApiSettings
{
    /// <summary>
    /// The default configuration section name.
    /// </summary>
    public const string SectionName = "CurrencyApiSettings";

    /// <summary>
    /// Gets or sets the base URL for the external exchange rate API (e.g. https://api.frankfurter.app/).
    /// </summary>
    public string BaseUrl { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the timeout duration in seconds for calling the external API.
    /// </summary>
    public int TimeoutSeconds { get; set; } = 15;
}
