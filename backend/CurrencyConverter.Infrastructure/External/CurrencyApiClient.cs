using System.Net.Http.Json;
using CurrencyConverter.Applicatio.DTOs;
using CurrencyConverter.Applicatio.Interfaces;

namespace CurrencyConverter.Infrastructure.External;

/// <summary>
/// Infrastructure implementation of Currency API Client communicating with the public Frankfurter API.
/// </summary>
public class CurrencyApiClient : ICurrencyApiClient
{
    private readonly HttpClient _httpClient;

    /// <summary>
    /// Initializes a new instance of the <see cref="CurrencyApiClient"/> class.
    /// </summary>
    public CurrencyApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    /// <inheritdoc />
    public async Task<Dictionary<string, string>> GetCurrenciesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<Dictionary<string, string>>("currencies", cancellationToken);
            return response ?? [];
        }
        catch (Exception ex)
        {
            throw new HttpRequestException("Failed to fetch supported currencies from Frankfurter API.", ex);
        }
    }

    /// <inheritdoc />
    public async Task<ConvertResponse> ConvertAsync(ConvertRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            var url = $"latest?amount={request.Amount}&from={request.From}&to={request.To}";
            var response = await _httpClient.GetFromJsonAsync<FrankfurterConvertResponse>(url, cancellationToken);

            if (response == null || response.Rates == null || !response.Rates.TryGetValue(request.To, out var convertedAmount))
            {
                throw new HttpRequestException($"Failed to convert currency. Conversion rate from '{request.From}' to '{request.To}' was not returned.");
            }

            var exchangeRate = convertedAmount / request.Amount;

            return new ConvertResponse
            {
                From = request.From,
                To = request.To,
                OriginalAmount = request.Amount,
                ConvertedAmount = convertedAmount,
                ExchangeRate = exchangeRate,
                Timestamp = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            throw new HttpRequestException($"External API conversion failed: {ex.Message}", ex);
        }
    }
}

/// <summary>
/// Internal class representing the JSON structure returned by Frankfurter currency latest endpoint.
/// </summary>
internal class FrankfurterConvertResponse
{
    public decimal Amount { get; set; }
    public string Base { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public Dictionary<string, decimal> Rates { get; set; } = [];
}
