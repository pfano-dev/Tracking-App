namespace Tracking_App_Backend.Application.Common
{

    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message) { }
    }

    public class ValidationException : Exception
    {
        public List<string> Errors { get; set; }

        public ValidationException(List<string> errors) : base("Validation failed")
        {
            Errors = errors;
        }
    }
}
