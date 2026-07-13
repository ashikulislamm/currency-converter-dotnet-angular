namespace CurrencyConverter.Applicatio.DTOs;

/// <summary>
/// DTO representing a request to convert an amount between currencies.
/// </summary>
public class ConvertRequest
{
    /// <summary>
    /// Gets or sets the source currency ISO code (e.g. USD).
    /// </summary>
    public string From { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the destination currency ISO code (e.g. EUR).
    /// </summary>
    public string To { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the amount of source currency to convert.
    /// </summary>
    public decimal Amount { get; set; }
}
