namespace CurrencyConverter.Applicatio.DTOs;

/// <summary>
/// DTO representing the response returned after a successful currency conversion.
/// </summary>
public class ConvertResponse
{
    /// <summary>
    /// Gets or sets the source currency code.
    /// </summary>
    public string From { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the target currency code.
    /// </summary>
    public string To { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the original amount.
    /// </summary>
    public decimal OriginalAmount { get; set; }

    /// <summary>
    /// Gets or sets the direct exchange rate.
    /// </summary>
    public decimal ExchangeRate { get; set; }

    /// <summary>
    /// Gets or sets the computed converted amount.
    /// </summary>
    public decimal ConvertedAmount { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the conversion was computed.
    /// </summary>
    public DateTime Timestamp { get; set; }
}
