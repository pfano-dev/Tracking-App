using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tracking_App_Backend.Application.Common;
using Tracking_App_Backend.Application.DTOs;
using Tracking_App_Backend.Application.Interfaces;
using Tracking_App_Backend.Domain.Entities;
using Tracking_App_Backend.Domain.Enums;

namespace Tracking_App_Backend.API.Controllers
{
    [Route("api/work-items")]
    [ApiController]
    public class WorkItemsController : ControllerBase
    {

        private readonly IWorkItemService _service;

        public WorkItemsController(IWorkItemService service)
        {
            _service = service;
        }

        [HttpGet("get-all-items")]
        public async Task<IActionResult> GetAll(
            [FromQuery] WorkItemStatus? status,
            [FromQuery] string? sortBy,
            [FromQuery] string? order)
        {
            var items = await _service.GetAllAsync(status, sortBy, order);

            return Ok(ApiResponse<List<WorkItem>>.SuccessResponse(items));
        }

        [HttpGet("get-item/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var item = await _service.GetByIdAsync(id);

            return Ok(ApiResponse<WorkItem>.SuccessResponse(item));
        }

        [HttpPost("create-item")]
        public async Task<IActionResult> Create([FromBody] CreateWorkItemRequestDto request)
        {
            var item = await _service.CreateAsync(request.Title, request.Description);
            return CreatedAtAction(nameof(Get),
         new { id = item.Id },
         ApiResponse<WorkItem>.SuccessResponse(item));
        }

        [HttpPut("edit-item/{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateWorkItemRequestDto request)
        {
            var item = await _service.UpdateAsync(id, request.Title, request.Description, request.Status);

            return Ok(ApiResponse<WorkItem>.SuccessResponse(item));
        }

        [HttpDelete("delete-item/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);

            return Ok(ApiResponse<string>.SuccessResponse("Deleted successfully"));
        }
    }

}

