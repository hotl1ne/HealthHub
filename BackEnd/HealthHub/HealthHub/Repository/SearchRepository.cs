using HealthHub.Database;
using HealthHub.Interfaces;
using HealthHub.Models;

namespace HealthHub.Repository
{
    public class SearchRepository : ISearch
    {
        private readonly DataContext _dataContext;
        public SearchRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public List<FoodModel> FindFood(string food_name)
        {
            List<FoodModel> foods = new List<FoodModel>();
            try
            {
                foods = _dataContext.Foods.Where(x => x.Name.Contains(food_name)).ToList();
                return foods;
            }
            catch(Exception)
            {
                throw;
            }
        }
    }
}
