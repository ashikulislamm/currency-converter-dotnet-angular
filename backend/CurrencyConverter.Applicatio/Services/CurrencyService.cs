using CurrencyConverter.Applicatio.Common.Exceptions;
using CurrencyConverter.Applicatio.DTOs;
using CurrencyConverter.Applicatio.Interfaces;

namespace CurrencyConverter.Applicatio.Services;

/// <summary>
/// Service handling currency conversion calculations and queries, enforcing validation rules.
/// </summary>
public class CurrencyService : ICurrencyService
{
    private readonly ICurrencyApiClient _apiClient;

    /// <summary>
    /// Initializes a new instance of the <see cref="CurrencyService"/> class.
    /// </summary>
    public CurrencyService(ICurrencyApiClient apiClient)
    {
        _apiClient = apiClient;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<CurrencyDto>> GetCurrenciesAsync(CancellationToken cancellationToken = default)
    {
        var currencies = await _apiClient.GetCurrenciesAsync(cancellationToken);
        
        return currencies.Select(kvp => new CurrencyDto
        {
            Code = kvp.Key,
            Name = kvp.Value
        })
        .OrderBy(c => c.Code);
    }

    /// <inheritdoc />
    public async Task<ConvertResponse> ConvertAsync(ConvertRequest request, CancellationToken cancellationToken = default)
    {
        // 1. Core structural validations
        if (request == null)
        {
            throw new ValidationException("Request body cannot be null.");
        }

        if (string.IsNullOrWhiteSpace(request.From))
        {
            throw new ValidationException("Source currency code is required.");
        }

        if (string.IsNullOrWhiteSpace(request.To))
        {
            throw new ValidationException("Destination currency code is required.");
        }

        if (request.Amount <= 0)
        {
            throw new ValidationException("Amount must be greater than zero.");
        }

        // Normalize inputs
        var sourceCurrency = request.From.Trim().ToUpperInvariant();
        var targetCurrency = request.To.Trim().ToUpperInvariant();

        if (sourceCurrency == targetCurrency)
        {
            throw new ValidationException("Source and destination currencies must be different.");
        }

        // 2. Dynamic support checks
        var supported = await _apiClient.GetCurrenciesAsync(cancellationToken);

        if (!supported.ContainsKey(sourceCurrency))
        {
            throw new ValidationException($"Source currency '{sourceCurrency}' is not supported.");
        }

        if (!supported.ContainsKey(targetCurrency))
        {
            throw new ValidationException($"Destination currency '{targetCurrency}' is not supported.");
        }

        // Re-assign normalized codes
        request.From = sourceCurrency;
        request.To = targetCurrency;

        // 3. Delegate calculation
        return await _apiClient.ConvertAsync(request, cancellationToken);
    }
}
