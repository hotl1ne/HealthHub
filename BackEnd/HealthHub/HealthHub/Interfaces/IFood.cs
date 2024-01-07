using HealthHub.Models;

namespace HealthHub.Interfaces
{
    public interface IFood
    {
        public List<FoodModel> GetAllFoods();
        public Task<FoodModel> GetFoodbyId(Guid id);
        public void AddFood(FoodModel model);

    }
}
