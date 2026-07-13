using CurrencyConverter.Applicatio.DTOs;

namespace CurrencyConverter.Applicatio.Interfaces;

/// <summary>
/// Abstraction interface for communicating with the external currency rates API.
/// </summary>
public interface ICurrencyApiClient
{
    /// <summary>
    /// Fetches all supported currencies from the external exchange rate provider.
    /// </summary>
    Task<Dictionary<string, string>> GetCurrenciesAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Converts a currency amount by calling the external exchange rate provider.
    /// </summary>
    Task<ConvertResponse> ConvertAsync(ConvertRequest request, CancellationToken cancellationToken = default);
}
