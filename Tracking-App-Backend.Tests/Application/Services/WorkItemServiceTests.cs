using Xunit;
using Moq;
using Tracking_App_Backend.Application.Services;
using Tracking_App_Backend.Application.Interfaces;
using Tracking_App_Backend.Domain.Entities;
using Tracking_App_Backend.Domain.Enums;
using Tracking_App_Backend.Application.Common;

public class WorkItemServiceTests
{
    private readonly Mock<IWorkItemRepository> _repoMock;
    private readonly WorkItemService _service;

    public WorkItemServiceTests()
    {
        _repoMock = new Mock<IWorkItemRepository>();
        _service = new WorkItemService(_repoMock.Object);
    }

    // ✅ GetByIdAsync - Success
    [Fact]
    public async Task GetByIdAsync_ShouldReturnItem_WhenExists()
    {
        var id = Guid.NewGuid();
        var item = new WorkItem { Id = id, Title = "Test" };

        _repoMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(item);

        var result = await _service.GetByIdAsync(id);

        Assert.NotNull(result);
        Assert.Equal(id, result.Id);
    }

    // ✅ GetByIdAsync - Not Found
    [Fact]
    public async Task GetByIdAsync_ShouldThrowNotFound_WhenNotExists()
    {
        var id = Guid.NewGuid();

        _repoMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync((WorkItem?)null);

        await Assert.ThrowsAsync<NotFoundException>(() => _service.GetByIdAsync(id));
    }

    // ✅ CreateAsync - Success
    [Fact]
    public async Task CreateAsync_ShouldCreateItem_WhenValid()
    {
        var title = "Test";
        var description = "Desc";

        var result = await _service.CreateAsync(title, description);

        Assert.Equal(title, result.Title);
        _repoMock.Verify(r => r.AddAsync(It.IsAny<WorkItem>()), Times.Once);
    }

    // ✅ CreateAsync - Validation Error
    [Fact]
    public async Task CreateAsync_ShouldThrowValidationException_WhenTitleIsEmpty()
    {
        await Assert.ThrowsAsync<ValidationException>(() =>
            _service.CreateAsync("", "desc"));
    }

    // ✅ UpdateAsync - Success
    [Fact]
    public async Task UpdateAsync_ShouldUpdateItem_WhenValid()
    {
        var id = Guid.NewGuid();
        var existing = new WorkItem { Id = id, Title = "Old" };

        _repoMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(existing);

        var result = await _service.UpdateAsync(id, "New", "Desc", WorkItemStatus.InProgress);

        Assert.Equal("New", result!.Title); // null-forgiving operator
        _repoMock.Verify(r => r.UpdateAsync(existing), Times.Once);
    }

    // ✅ UpdateAsync - Not Found
    [Fact]
    public async Task UpdateAsync_ShouldThrowNotFound_WhenItemNotExists()
    {
        var id = Guid.NewGuid();

        _repoMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync((WorkItem?)null);

        await Assert.ThrowsAsync<NotFoundException>(() =>
            _service.UpdateAsync(id, "Title", "Desc", WorkItemStatus.Completed));
    }

    // ✅ UpdateAsync - Validation Error
    [Fact]
    public async Task UpdateAsync_ShouldThrowValidationException_WhenTitleEmpty()
    {
        var id = Guid.NewGuid();

        await Assert.ThrowsAsync<ValidationException>(() =>
            _service.UpdateAsync(id, "", "Desc", WorkItemStatus.Completed));
    }

    // ✅ DeleteAsync - Success
    [Fact]
    public async Task DeleteAsync_ShouldDelete_WhenItemExists()
    {
        var id = Guid.NewGuid();
        var item = new WorkItem { Id = id };

        _repoMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(item);

        await _service.DeleteAsync(id);

        _repoMock.Verify(r => r.DeleteAsync(id), Times.Once);
    }

    // ✅ DeleteAsync - Not Found
    [Fact]
    public async Task DeleteAsync_ShouldThrowNotFound_WhenItemNotExists()
    {
        var id = Guid.NewGuid();

        _repoMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync((WorkItem?)null);

        await Assert.ThrowsAsync<NotFoundException>(() =>
            _service.DeleteAsync(id));
    }
}