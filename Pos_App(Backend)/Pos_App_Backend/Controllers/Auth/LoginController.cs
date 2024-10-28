using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Pos_App_Backend.Entities;
using Pos_App_Backend.Entities.Auth;
using Pos_App_Backend.Repository;
using Pos_App_Backend.Security;
using System.Text;

namespace Pos_App_Backend.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        



        public LoginController(IConfiguration configuration,IUserRepository userRepository,UserController userControlleri)
        {
            _configuration = configuration;
            _userRepository = userRepository;
           


        }
        [HttpGet]
        public IActionResult Get()
        {
            Token token=Security.TokenHandler.CreateToken(_configuration);
            return Ok(token);
            


        }
        [HttpPost]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            if (loginModel == null || string.IsNullOrEmpty(loginModel.email) || string.IsNullOrEmpty(loginModel.password))
            {
                return BadRequest("E-posta ve şifre gereklidir.");
            }

            // UserController'dan tüm kullanıcıları al
            var allUsers = _userRepository.GetAllUsers();

            // Kullanıcıyı email ile bul
            var user = allUsers.FirstOrDefault(u => u.Email == loginModel.email);

            // Kullanıcı var mı ve şifre doğru mu kontrol et
            if (user == null || user.Password != loginModel.password) // Şifre kontrolü (hashleme önerilir)
            {
                return Unauthorized("Geçersiz e-posta veya şifre.");
            }

            // Token oluşturma
            Token token = Security.TokenHandler.CreateToken(_configuration);
            return Ok(new
            {
                accessToken=token.AccessToken,
                expiration=token.Expiration,
                refreshToken=token.RefreshToken,
                user = new
                {
                    email=loginModel.email,
                }
            }); // Token'ı döndür
        }




    }
}
