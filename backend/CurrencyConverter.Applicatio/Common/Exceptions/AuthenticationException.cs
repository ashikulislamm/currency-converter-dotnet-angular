namespace CurrencyConverter.Applicatio.Common.Exceptions;

/// <summary>
/// Exception thrown when authentication fails.
/// </summary>
public class AuthenticationException : Exception
{
    /// <summary>
    /// Initializes a new instance of the AuthenticationException class with a specified message.
    /// </summary>
    public AuthenticationException(string message) : base(message)
    {
    }
}
