using HealthHub.Database;
using HealthHub.Models;
using HealthHub.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto;
using ZstdSharp.Unsafe;

namespace HealthHub.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class UserController : Controller
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private DataContext _dataContext;

        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, DataContext dataContext) { 
            _userManager = userManager;
            _signInManager = signInManager;
            _dataContext = dataContext;
        }
        
        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserModel userModel)
        {
            var user = await _userManager.FindByEmailAsync(userModel.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, userModel.Password))
            {
                return Unauthorized(new { message = "Bad email or password, try again" });
            }
            else
            {
                var result = await _signInManager.PasswordSignInAsync(user, userModel.Password, false, false);
                if (result.Succeeded)
                {
                    return Ok(new {id = user.Id});
                }
            }
            return View(userModel);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserModel userModel)
        {
            var user = await _userManager.FindByEmailAsync(userModel.Email);

            if(user != null)
            {
                return Unauthorized(new {message = "Email is register"});
            }
            else
            {
                var new_user = new AppUser()
                {
                    Email = userModel.Email,
                    UserName = userModel.Username,
                    Adress = userModel.Adress,
                    Workplace = userModel.Workplace,
                    Url_Photo = userModel.Url_Photo,
                    PhoneNumber = userModel.Phone,
                    Sertificates = userModel.Sertificates,
                    Rate = userModel.Rate,
                    Knowlages = userModel.Knowlages,
                    DateOfBirht = userModel.DateOfBirht,
                    EmailConfirmed = true
                };
                var result = await _userManager.CreateAsync(new_user, userModel.Password);
                if(result.Succeeded)
                {
                    return Ok(new { Id = new_user.Id, Email = userModel.Email, username = userModel.Username, Adress = userModel.Adress, Photo = userModel.Url_Photo, Phone = userModel.Phone, Workplace = userModel.Workplace, Sertificates = userModel.Sertificates}) ;
                }
                else
                {
                    return BadRequest("Something went wrong!");
                }
            }
        }

        [HttpGet("getUser/{Id}")]
        public async Task<IActionResult> GetUser(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);
            if (user != null)
            {
                var UserInfo = new
                {
                    Email = user.Email,
                    Adress = user.Adress,
                    Workplace = user.Workplace,
                    Phone = user.PhoneNumber,
                    UserName = user.UserName
                };
                return Ok(new { email = UserInfo.Email, adress = UserInfo.Adress, workplace = UserInfo.Workplace, phone = UserInfo.Phone, username = UserInfo.UserName });
            }
            else
            {
                return BadRequest("User not found");
            }
        }

        [HttpDelete("Logout/{Id}")]
        public async Task<IActionResult> Logout(string Id)
        {
            var user = await _userManager.FindByIdAsync(Id);
            if (user != null && _signInManager.IsSignedIn(User))
            {
                await _signInManager.SignOutAsync();
                return Ok();
            }
            return BadRequest();
        }

        [HttpPut("ChangeInfo/{Id}")]
        public async Task<IActionResult> ChangeProfileInfo(string Id, [FromBody] ProfileModel profileModel)
        {
            var user = await _userManager.FindByIdAsync(Id);

            if(user!=null)
            {
                user.Adress = profileModel.Adress;
                user.PhoneNumber = profileModel.Phone;
                user.Workplace = profileModel.Workplace;
                await _userManager.ChangePasswordAsync(user, user.PasswordHash, profileModel.Password);
                _dataContext.Users.Update(user);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Something went wrong");
        }
    }
}
