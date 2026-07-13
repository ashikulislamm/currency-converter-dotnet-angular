using CurrencyConverter.Domain.Models;

namespace CurrencyConverter.Applicatio.Interfaces;

/// <summary>
/// Provider interface to abstract retrieval of user credentials.
/// </summary>
public interface IUserCredentialsProvider
{
    /// <summary>
    /// Retrieves a user by their username.
    /// </summary>
    /// <param name="username">The username to search for.</param>
    /// <returns>The User model if found, otherwise null.</returns>
    Task<User?> GetUserByUsernameAsync(string username);
}
