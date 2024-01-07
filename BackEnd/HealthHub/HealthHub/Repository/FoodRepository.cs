using HealthHub.Database;
using HealthHub.Interfaces;
using HealthHub.Models;

namespace HealthHub.Repository
{
    public class FoodRepository : IFood
    {

        private DataContext _database;
        public FoodRepository(DataContext data) 
        {
            _database = data;
        }
        public void AddFood(FoodModel model)
        {
            try 
            {
                var new_food = new FoodModel()
                {
                    Id = Guid.NewGuid(),
                    Photo_Url = model.Photo_Url,
                    Name = model.Name,
                    Description = model.Description,
                    Fats = model.Fats,
                    Proteins = model.Proteins,
                    Carbohydrates = model.Carbohydrates
                };

                var success = _database.AddAsync(new_food);
                if(success.IsCompleted) 
                {
                    _database.SaveChanges();
                }
                    
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public List<FoodModel> GetAllFoods()
        {
            List<FoodModel> foods;
            try
            {
                foods = _database.Foods.ToList();
                return foods;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<FoodModel> GetFoodbyId(Guid id)
        {
            try
            {
                var food = await _database.Foods.FindAsync(id);

                return food;
            }
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}
