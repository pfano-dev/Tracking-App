using Tracking_App_Backend.Domain.Entities;
using Tracking_App_Backend.Domain.Enums;

namespace Tracking_App_Backend.Application.Interfaces
{
    public interface IWorkItemService
    {
        Task<List<WorkItem>> GetAllAsync(WorkItemStatus? status, string? sortBy, string? order);
        Task<WorkItem?> GetByIdAsync(Guid id);
        Task<WorkItem> CreateAsync(string title, string description);
        Task<WorkItem?> UpdateAsync(Guid id, string title, string description, WorkItemStatus status);
        Task<bool> DeleteAsync(Guid id);
    }
}
