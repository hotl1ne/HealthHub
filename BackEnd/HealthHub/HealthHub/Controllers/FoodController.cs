using HealthHub.Models;
using HealthHub.Repository;
using Microsoft.AspNetCore.Mvc;
using System.CodeDom;

namespace HealthHub.Controllers
{
    [ApiController]
    [Route("/api/Food")]
    public class FoodController : Controller
    {
        private readonly FoodRepository _foodRepository;
        public FoodController(FoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
        }

        [HttpPost("AddFood")]
        public async Task<IActionResult> AddFood([FromBody] FoodModel foodModel)
        {
            try
            {
                _foodRepository.AddFood(foodModel);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex });
            }
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllFoods()
        {
            try
            {
                var foods = _foodRepository.GetAllFoods();
                return Ok(foods);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex });
            }
        }

        [HttpGet("GetById/{Id}")]
        public async Task<IActionResult> GetByID(string Id)
        {
            try
            {
                var food = await _foodRepository.GetFoodbyId(new Guid(Id));
                if(food!=null)
                {
                    return Ok(food);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex });
            }
            return BadRequest();
        }
    }
}
