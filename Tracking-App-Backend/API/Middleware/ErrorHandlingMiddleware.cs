using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;
using Tracking_App_Backend.Application.Common;

namespace Tracking_App_Backend.API.Middleware
{
    public class ErrorHandlingMiddleware
    {


        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException ex)
            {
                await HandleException(context, HttpStatusCode.BadRequest, ex.Errors);
            }
            catch (NotFoundException ex)
            {
                await HandleException(context, HttpStatusCode.NotFound, new List<string> { ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred");
                await HandleException(context, HttpStatusCode.InternalServerError,
                    new List<string> { "An unexpected error occurred" });
            }
        }

        private static async Task HandleException(HttpContext context, HttpStatusCode statusCode, List<string> errors)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var response = ApiResponse<string>.FailureResponse(errors);

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }

    }
}
