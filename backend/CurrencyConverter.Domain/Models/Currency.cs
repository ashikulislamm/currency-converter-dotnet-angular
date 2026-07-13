namespace CurrencyConverter.Domain.Models;

/// <summary>
/// Domain model representing a currency.
/// </summary>
public class Currency
{
    /// <summary>
    /// Gets or sets the three-letter ISO currency code (e.g., USD, EUR).
    /// </summary>
    public string Code { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the full display name of the currency (e.g., United States Dollar).
    /// </summary>
    public string Name { get; set; } = string.Empty;
}
