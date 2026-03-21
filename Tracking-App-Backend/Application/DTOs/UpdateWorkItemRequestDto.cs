using Tracking_App_Backend.Domain.Enums;

namespace Tracking_App_Backend.Application.DTOs
{
    public class UpdateWorkItemRequestDto
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public WorkItemStatus Status { get; set; }
    }
}
