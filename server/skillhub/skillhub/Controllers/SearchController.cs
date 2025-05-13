using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.SearchResult;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly IGigSearchService _searchService;
        private readonly ILogger<SearchController> _logger;

        public SearchController(
            IGigSearchService searchService,
            ILogger<SearchController> logger)
        {
            _searchService = searchService;
            _logger = logger;
        }

        [HttpGet("search/{query}")]
        public async Task<IActionResult> Search([FromRoute] string query)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(query))
                {
                    return BadRequest("Search query cannot be empty");
                }

                var results = await _searchService.SearchGigsAsync(query);

                if (!results.Any())
                {
                    return NotFound("No gigs found matching your search");
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching gigs for query: {Query}", query);
                return StatusCode(500, "An error occurred while processing your search");
            }
        }

    }

}
