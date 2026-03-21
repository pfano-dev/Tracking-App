using Tracking_App_Backend.Domain.Enums;

namespace Tracking_App_Backend.Domain.Entities
{
    public class WorkItem
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public WorkItemStatus Status { get; set; } = WorkItemStatus.Open;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
