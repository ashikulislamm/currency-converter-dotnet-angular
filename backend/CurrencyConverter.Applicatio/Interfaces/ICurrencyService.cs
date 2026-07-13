using CurrencyConverter.Applicatio.DTOs;

namespace CurrencyConverter.Applicatio.Interfaces;

/// <summary>
/// Service interface for currency-related calculations and queries.
/// </summary>
public interface ICurrencyService
{
    /// <summary>
    /// Retrieves all supported currencies mapped to a list of DTOs.
    /// </summary>
    Task<IEnumerable<CurrencyDto>> GetCurrenciesAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Processes a request to convert an amount and returns conversion details.
    /// </summary>
    Task<ConvertResponse> ConvertAsync(ConvertRequest request, CancellationToken cancellationToken = default);
}
