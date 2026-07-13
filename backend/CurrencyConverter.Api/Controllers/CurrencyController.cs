using CurrencyConverter.Applicatio.DTOs;
using CurrencyConverter.Applicatio.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyConverter.Api.Controllers;

/// <summary>
/// API controller exposing secured currency conversion and querying endpoints.
/// </summary>
[ApiController]
[Route("api/currency")]
[Authorize]
public class CurrencyController : ControllerBase
{
    private readonly ICurrencyService _currencyService;

    /// <summary>
    /// Initializes a new instance of the <see cref="CurrencyController"/> class.
    /// </summary>
    public CurrencyController(ICurrencyService currencyService)
    {
        _currencyService = currencyService;
    }

    /// <summary>
    /// Gets all supported currencies from the API service.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A list of supported currencies wrapped in an ApiResponse.</returns>
    [HttpGet("currencies")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<CurrencyDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetSupportedCurrencies(CancellationToken cancellationToken)
    {
        var currencies = await _currencyService.GetCurrenciesAsync(cancellationToken);
        return Ok(ApiResponse<IEnumerable<CurrencyDto>>.SuccessResponse(currencies, "Supported currencies list retrieved successfully."));
    }

    /// <summary>
    /// Converts an amount from a source currency to a target currency.
    /// </summary>
    /// <param name="request">Request parameters containing from, to, and amount.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A conversion response containing rate and converted amount wrapped in an ApiResponse.</returns>
    [HttpPost("convert")]
    [ProducesResponseType(typeof(ApiResponse<ConvertResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status412PreconditionFailed)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ConvertCurrency([FromBody] ConvertRequest request, CancellationToken cancellationToken)
    {
        var result = await _currencyService.ConvertAsync(request, cancellationToken);
        return Ok(ApiResponse<ConvertResponse>.SuccessResponse(result, "Currency conversion completed successfully."));
    }
}
