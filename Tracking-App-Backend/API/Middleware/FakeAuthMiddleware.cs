using System.Net;
using System.Text.Json;
using Tracking_App_Backend.Application.Common;

namespace Tracking_App_Backend.API.Middleware
{
    public class FakeAuthMiddleware
    {
        private readonly RequestDelegate _next;

        public FakeAuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {

            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrWhiteSpace(authHeader) || authHeader != "Bearer test-token")
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.ContentType = "application/json";

                var response = ApiResponse<string>.FailureResponse(
                    new List<string> { "Unauthorized: Missing or invalid token" });

                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
                return;
            }

            await _next(context);
        }
    }
}
