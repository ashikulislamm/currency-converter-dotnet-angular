namespace CurrencyConverter.Applicatio.Common.Exceptions;

/// <summary>
/// Exception thrown when application-level validation checks fail.
/// </summary>
public class ValidationException : Exception
{
    /// <summary>
    /// Initializes a new instance of the <see cref="ValidationException"/> class with a specified message.
    /// </summary>
    public ValidationException(string message) : base(message)
    {
    }
}
