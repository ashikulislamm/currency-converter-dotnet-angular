namespace CurrencyConverter.Applicatio.DTOs;

/// <summary>
/// DTO representing a currency with its code and descriptive name.
/// </summary>
public class CurrencyDto
{
    /// <summary>
    /// Gets or sets the ISO code of the currency.
    /// </summary>
    public string Code { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the descriptive display name of the currency.
    /// </summary>
    public string Name { get; set; } = string.Empty;
}
