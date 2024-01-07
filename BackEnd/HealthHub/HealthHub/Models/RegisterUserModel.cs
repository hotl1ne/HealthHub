namespace HealthHub.Models
{
    public class RegisterUserModel
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Workplace { get; set; }   
        public string Adress { get; set; }
        public string Phone { get; set; }
        public string Url_Photo { get; set; }
        public string Sertificates { get; set;}
        public string Knowlages { get; set; }
        public string Rate { get; set; }
        public DateTime DateOfBirht { get; set; }
    }
}
