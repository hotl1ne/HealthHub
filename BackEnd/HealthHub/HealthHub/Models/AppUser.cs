using Microsoft.AspNetCore.Identity;

namespace HealthHub.Models
{
    public class AppUser : IdentityUser
    {
        public string Workplace { get; set; }
        public string Adress { get; set; }
        public string Url_Photo { get; set; }
        public string Sertificates { get; set; }
        public string Knowlages { get; set; }
        public string Rate { get; set; }
        public DateTime DateOfBirht { get; set; }
    }
}
