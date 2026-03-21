using Tracking_App_Backend.Application.Interfaces;
using Tracking_App_Backend.Domain.Entities;
using Tracking_App_Backend.Domain.Enums;

namespace Tracking_App_Backend.Infrastructure.Repositories
{
    public class InMemoryWorkItemRepository : IWorkItemRepository
    {

        private readonly List<WorkItem> _items = new();

        public Task<List<WorkItem>> GetAllAsync(WorkItemStatus? status, string? sortBy, string? order)
        {
            var query = _items.AsQueryable();

         
            if (status.HasValue)
            {
                query = query.Where(x => x.Status == status.Value);
            }

            query = (sortBy?.ToLower(), order?.ToLower()) switch
            {
                ("title", "desc") => query.OrderByDescending(x => x.Title),
                ("title", _) => query.OrderBy(x => x.Title),

                ("createdat", "desc") => query.OrderByDescending(x => x.CreatedAt),
                ("createdat", _) => query.OrderBy(x => x.CreatedAt),

                _ => query.OrderByDescending(x => x.CreatedAt)
            };

            return Task.FromResult(query.ToList());
        }
        public Task<WorkItem?> GetByIdAsync(Guid id)
        {
            return Task.FromResult(_items.FirstOrDefault(x => x.Id == id));
        }

        public Task AddAsync(WorkItem item)
        {
            _items.Add(item);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(WorkItem item)
        {
            var index = _items.FindIndex(x => x.Id == item.Id);
            if (index != -1)
                _items[index] = item;

            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item != null)
                _items.Remove(item);

            return Task.CompletedTask;
        }
    }
}
