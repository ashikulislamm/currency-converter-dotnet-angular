using System.Security.Claims;
using CurrencyConverter.Applicatio.DTOs;
using CurrencyConverter.Applicatio.Interfaces;
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

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthController"/> class.
    /// </summary>
    public AuthController(IAuthService authService)
    {
        _authService = authService;
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

        var userResponse = new UserResponse
        {
            Username = username,
            DisplayName = displayName,
            Role = role
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
