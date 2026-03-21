namespace Tracking_App_Backend.Application.Common
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public List<string> Errors { get; set; } = new();

        public static ApiResponse<T> SuccessResponse(T data)
        {
            return new ApiResponse<T>
            {
                Success = true,
                Data = data
            };
        }

        public static ApiResponse<T> FailureResponse(List<string> errors)
        {
            return new ApiResponse<T>
            {
                Success = false,
                Errors = errors
            };
        }
    }
}
