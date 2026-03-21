using Tracking_App_Backend.Application.Interfaces;
using Tracking_App_Backend.Domain.Entities;
using Tracking_App_Backend.Domain.Enums;

namespace Tracking_App_Backend.Application.Services
{
    public class WorkItemService: IWorkItemService
    {

        private readonly IWorkItemRepository _repo;

        public WorkItemService(IWorkItemRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<WorkItem>> GetAllAsync(WorkItemStatus? status, string? sortBy, string? order)
        {
            return await _repo.GetAllAsync(status, sortBy, order);
        }

        public async Task<WorkItem?> GetByIdAsync(Guid id)
        {
            return await _repo.GetByIdAsync(id);
        }

        public async Task<WorkItem> CreateAsync(string title, string description)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new Exception("Title is required");

            var item = new WorkItem
            {
                Title = title,
                Description = description
            };

            await _repo.AddAsync(item);
            return item;
        }

        public async Task<WorkItem?> UpdateAsync(Guid id, string title, string description, WorkItemStatus status)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return null;

            if (string.IsNullOrWhiteSpace(title))
                throw new Exception("Title is required");

            existing.Title = title;
            existing.Description = description;
            existing.Status = status;

            await _repo.UpdateAsync(existing);
            return existing;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return false;

            await _repo.DeleteAsync(id);
            return true;
        }

    }
}
