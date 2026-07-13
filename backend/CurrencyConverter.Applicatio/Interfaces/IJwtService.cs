using CurrencyConverter.Domain.Models;

namespace CurrencyConverter.Applicatio.Interfaces;

/// <summary>
/// Service interface for operations related to JSON Web Tokens (JWT).
/// </summary>
public interface IJwtService
{
    /// <summary>
    /// Generates a security token for the authenticated user.
    /// </summary>
    /// <param name="user">The user domain model.</param>
    /// <returns>A string representation of the JWT.</returns>
    string GenerateToken(User user);
}
