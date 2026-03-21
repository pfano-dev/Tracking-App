using Tracking_App_Backend.Domain.Entities;
using Tracking_App_Backend.Domain.Enums;

namespace Tracking_App_Backend.Application.Interfaces
{
    public interface IWorkItemRepository
    {
        Task<List<WorkItem>> GetAllAsync(WorkItemStatus? status, string? sortBy, string? order);
        Task<WorkItem?> GetByIdAsync(Guid id);
        Task AddAsync(WorkItem item);
        Task UpdateAsync(WorkItem item);
        Task DeleteAsync(Guid id);
    }
}
