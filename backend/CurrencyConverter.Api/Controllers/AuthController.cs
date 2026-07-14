using System.Security.Claims;
using CurrencyConverter.Applicatio.DTOs;
using CurrencyConverter.Applicatio.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyConverter.Api.Controllers;

/// <summary>
/// API controller handling authentication and user profile requests.
/// </summary>
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IJwtService _jwtService;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthController"/> class.
    /// </summary>
    public AuthController(IAuthService authService, IJwtService jwtService)
    {
        _authService = authService;
        _jwtService = jwtService;
    }

    /// <summary>
    /// Authenticates a user and returns a JWT token.
    /// </summary>
    /// <param name="request">The login request payload.</param>
    /// <returns>A standardized API response enclosing the token and user details.</returns>
    [HttpPost("login")]
    [ProducesResponseType(typeof(ApiResponse<LoginResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);
        return Ok(ApiResponse<LoginResponse>.SuccessResponse(response, "Login successful."));
    }

    /// <summary>
    /// Initiates Google OAuth challenge.
    /// </summary>
    [HttpGet("google-login")]
    public IActionResult GoogleLogin()
    {
        var redirectUrl = Url.Action(nameof(GoogleCallback));
        var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        return Challenge(properties, "Google");
    }

    /// <summary>
    /// Receives Google's authentication response, generates JWT and redirects to Angular.
    /// </summary>
    [HttpGet("google-callback")]
    public async Task<IActionResult> GoogleCallback()
    {
        var authenticateResult = await HttpContext.AuthenticateAsync("GoogleCookie");
        if (!authenticateResult.Succeeded || authenticateResult.Principal == null)
        {
            return Redirect("http://localhost:4200/login?error=GoogleAuthFailed");
        }

        var principal = authenticateResult.Principal;

        var email = principal.FindFirst(ClaimTypes.Email)?.Value;
        var name = principal.FindFirst(ClaimTypes.Name)?.Value ?? email ?? "Google User";
        var profilePicture = principal.FindFirst("urn:google:picture")?.Value;

        if (string.IsNullOrEmpty(email))
        {
            await HttpContext.SignOutAsync("GoogleCookie");
            return Redirect("http://localhost:4200/login?error=MissingEmail");
        }

        var googleUser = new CurrencyConverter.Domain.Models.User
        {
            Username = email,
            Password = string.Empty,
            DisplayName = name,
            Role = "User",
            Email = email,
            ProfilePicture = profilePicture,
            Provider = "Google",
            LoginMethod = "Google OAuth"
        };

        var token = _jwtService.GenerateToken(googleUser);

        await HttpContext.SignOutAsync("GoogleCookie");

        return Redirect($"http://localhost:4200/auth/callback?token={token}");
    }

    /// <summary>
    /// Gets the current logged-in user profile info directly from the JWT claims.
    /// </summary>
    /// <returns>A standardized API response containing the user profile details.</returns>
    [Authorize]
    [HttpGet("me")]
    [ProducesResponseType(typeof(ApiResponse<UserResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult GetCurrentUser()
    {
        // Extract claims from the ClaimsPrincipal (HttpContext.User)
        var username = User.Identity?.Name ?? string.Empty;
        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;
        var displayName = User.FindFirst("displayName")?.Value ?? string.Empty;
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        var profilePicture = User.FindFirst("profilePicture")?.Value;
        var provider = User.FindFirst("provider")?.Value ?? "Local";
        var loginMethod = User.FindFirst("loginMethod")?.Value ?? "Local Credentials";

        var userResponse = new UserResponse
        {
            Username = username,
            DisplayName = displayName,
            Role = role,
            Email = email,
            ProfilePicture = profilePicture,
            Provider = provider,
            LoginMethod = loginMethod
        };

        return Ok(ApiResponse<UserResponse>.SuccessResponse(userResponse, "Current user profile retrieved successfully."));
    }

    /// <summary>
    /// Logs out the user (stateless endpoint for completeness).
    /// </summary>
    /// <returns>A standardized success API response.</returns>
    [Authorize]
    [HttpPost("logout")]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult Logout()
    {
        // In a stateless JWT system, the client simply discards the token.
        // We return a successful response to let the client know.
        return Ok(ApiResponse.SuccessResponse("Logged out successfully."));
    }
}
