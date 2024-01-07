using HealthHub.Models;

namespace HealthHub.Interfaces
{
    public interface ISearch
    {
        public List<FoodModel> FindFood(string food_name);
    }
}
