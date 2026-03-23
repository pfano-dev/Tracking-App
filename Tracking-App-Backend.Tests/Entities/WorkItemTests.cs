using Xunit;
using Tracking_App_Backend.Domain.Entities;
using Tracking_App_Backend.Domain.Enums;
using System;

public class WorkItemTests
{
    [Fact]
    public void NewWorkItem_ShouldHaveDefaultValues()
    {
        var workItem = new WorkItem();

        Assert.NotEqual(Guid.Empty, workItem.Id);
        Assert.Equal(string.Empty, workItem.Title);
        Assert.Equal(string.Empty, workItem.Description);
        Assert.Equal(WorkItemStatus.Open, workItem.Status);

        // Allow small tolerance for CreatedAt
        Assert.True((DateTime.UtcNow - workItem.CreatedAt).TotalSeconds < 2);
    }

    [Fact]
    public void WorkItem_ShouldAllowPropertyUpdates()
    {
        var workItem = new WorkItem();
        var newId = Guid.NewGuid();
        var newTitle = "Test Title";
        var newDescription = "Test Description";
        var newStatus = WorkItemStatus.InProgress;
        var newCreatedAt = DateTime.UtcNow.AddHours(-1);

        workItem.Id = newId;
        workItem.Title = newTitle;
        workItem.Description = newDescription;
        workItem.Status = newStatus;
        workItem.CreatedAt = newCreatedAt;

        Assert.Equal(newId, workItem.Id);
        Assert.Equal(newTitle, workItem.Title);
        Assert.Equal(newDescription, workItem.Description);
        Assert.Equal(newStatus, workItem.Status);
        Assert.Equal(newCreatedAt, workItem.CreatedAt);
    }
}