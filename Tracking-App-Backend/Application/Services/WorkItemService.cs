using Tracking_App_Backend.Application.Common;
using Tracking_App_Backend.Application.Interfaces;
using Tracking_App_Backend.Domain.Entities;
using Tracking_App_Backend.Domain.Enums;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
            var item = await _repo.GetByIdAsync(id);

            if (item == null)
                throw new NotFoundException($"Work item with id {id} not found");

            return item;
        }

        public async Task<WorkItem> CreateAsync(string title, string description)
        {

            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(title))
                errors.Add("Title is required");

            if (errors.Any())
                throw new ValidationException(errors);

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
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(title))
                errors.Add("Title is required");

            if (errors.Any())
                throw new ValidationException(errors);

            var existing = await _repo.GetByIdAsync(id);

            if (existing == null)
                throw new NotFoundException($"Work item with id {id} not found");

            existing.Title = title;
            existing.Description = description;
            existing.Status = status;

            await _repo.UpdateAsync(existing);

            return existing;
        }

        public async Task DeleteAsync(Guid id)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null)
                throw new NotFoundException($"Work item with id {id} not found");

            await _repo.DeleteAsync(id);
        }

    }
}
