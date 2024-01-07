using HealthHub.Repository;
using Microsoft.AspNetCore.Mvc;
using System.CodeDom;

namespace HealthHub.Controllers
{
    [ApiController]
    [Route("api/Search")]
    public class SearchController : Controller
    {
        private readonly SearchRepository _searchRepository;

        public SearchController(SearchRepository searchRepository)
        {
            _searchRepository = searchRepository;
        }

        [HttpGet("FindFood/{name}")]
        public async Task<IActionResult> FindProduct(string name) 
        {
            var foods = _searchRepository.FindFood(name);
            return Ok(foods);
        }
    }
}
