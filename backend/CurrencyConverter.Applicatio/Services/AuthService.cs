using CurrencyConverter.Applicatio.Common.Exceptions;
using CurrencyConverter.Applicatio.DTOs;
using CurrencyConverter.Applicatio.Interfaces;

namespace CurrencyConverter.Applicatio.Services;

/// <summary>
/// Service implementation handling user authentication.
/// </summary>
public class AuthService : IAuthService
{
    private readonly IUserCredentialsProvider _credentialsProvider;
    private readonly IJwtService _jwtService;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthService"/> class.
    /// </summary>
    public AuthService(IUserCredentialsProvider credentialsProvider, IJwtService jwtService)
    {
        _credentialsProvider = credentialsProvider;
        _jwtService = jwtService;
    }

    /// <inheritdoc />
    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            throw new AuthenticationException("Username and password are required.");
        }

        var user = await _credentialsProvider.GetUserByUsernameAsync(request.Username);

        if (user == null || user.Password != request.Password)
        {
            throw new AuthenticationException("Invalid username or password.");
        }

        var token = _jwtService.GenerateToken(user);

        return new LoginResponse
        {
            Token = token,
            User = new UserResponse
            {
                Username = user.Username,
                DisplayName = user.DisplayName,
                Role = user.Role
            }
        };
    }
}
