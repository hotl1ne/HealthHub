namespace HealthHub.Models
{
    public class FoodModel
    {
        public Guid Id { get; set; }
        public string Photo_Url { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Proteins { get; set; }
        public string Fats { get; set; }
        public string Carbohydrates {  get; set; }

    }
}
