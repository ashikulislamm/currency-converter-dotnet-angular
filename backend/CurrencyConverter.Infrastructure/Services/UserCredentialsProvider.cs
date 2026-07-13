using CurrencyConverter.Applicatio.Interfaces;
using CurrencyConverter.Domain.Models;
using CurrencyConverter.Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace CurrencyConverter.Infrastructure.Services;

/// <summary>
/// Infrastructure implementation of UserCredentialsProvider that retrieves credentials from app configuration.
/// </summary>
public class UserCredentialsProvider : IUserCredentialsProvider
{
    private readonly UserCredentialsSettings _settings;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserCredentialsProvider"/> class.
    /// </summary>
    public UserCredentialsProvider(IOptions<UserCredentialsSettings> settings)
    {
        _settings = settings.Value;
    }

    /// <inheritdoc />
    public Task<User?> GetUserByUsernameAsync(string username)
    {
        var user = _settings.Users.FirstOrDefault(u =>
            u.Username.Equals(username, StringComparison.OrdinalIgnoreCase));

        return Task.FromResult(user);
    }
}
