using CurrencyConverter.Applicatio.DTOs;

namespace CurrencyConverter.Applicatio.Interfaces;

/// <summary>
/// Service interface for authentication operations.
/// </summary>
public interface IAuthService
{
    /// <summary>
    /// Authenticates a user based on login credentials.
    /// </summary>
    /// <param name="request">The login request payload.</param>
    /// <returns>A LoginResponse containing JWT and profile info.</returns>
    Task<LoginResponse> LoginAsync(LoginRequest request);
}
