using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.DTO;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
         private readonly DataContext _context;
        private readonly IAuthRepository _repo;
        public AuthController(DataContext context,IAuthRepository repo, IConfiguration config)
        {
            this._config = config;
            this._repo = repo;
            _context = context;

        }
        
        [HttpPost("register")]
       public async Task<IActionResult> Register([FromBody] UserForRegisterDto UserForRegisterDto)
        {
            //validate request
            UserForRegisterDto.Username = UserForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(UserForRegisterDto.Username))
            {
           
              return BadRequest("Username alreday exists");  
                 
            }
           else
           {
               
           
            var userToCreate = new User
            {
                Username = UserForRegisterDto.Username,
                CID=UserForRegisterDto.CID,
                Email=UserForRegisterDto.Email
                
            };
            var createuser = await _repo.Register(userToCreate, UserForRegisterDto.password);
            return StatusCode(201);
            }
        }
        [HttpPost("UpdateAccountExpiryDate")]
       public async Task<IActionResult> UpdateAccountExpiryDate([FromBody] UserForRegisterDto UserForRegisterDto)
        {
            _repo.UpdateAccountExpiryDate(UserForRegisterDto);
      
            return StatusCode(201);
        }
            [HttpPost("Changepassword")]
       public async Task<IActionResult> Changepassword([FromBody] UserForRegisterDto UserForRegisterDto)
        {
            _repo.Changepassword(UserForRegisterDto);
      
            return StatusCode(201);
        }
     [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username, userForLoginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();
            var claims = new[]{
             new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
             new Claim(ClaimTypes.Name,userFromRepo.Username)
         };
            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSetting:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
         
           var ClientInfo=_context.Clients.Where(xx=>xx.CID==userFromRepo.CID).SingleOrDefault();
            
            return Ok(new{
                token=tokenHandler.WriteToken(token),
                cid=userFromRepo.CID,
                accountexpiry=userFromRepo.AccountExpiryDate,
                Role=userFromRepo.Role,
                cname=ClientInfo != null ? ClientInfo.CName : "",
                address=ClientInfo != null ? ClientInfo.Address : "",
                email=ClientInfo != null ? ClientInfo.Email : "",
                contact=ClientInfo != null ? ClientInfo.Contact : ""
                
                }

            );
        }

[HttpGet("GetAllUsers")]
 public async Task<IActionResult> GetAllUsers()
{
var UList=await _repo.GetAllUsers();
 return Ok(UList);
 }
[HttpPost("CreateDocProfiles")]
 public async Task<IActionResult> CreateDocProfiles( [FromBody] Doctor Doctor )
{
    var CreatePathalogy =await _repo.CreateDocProfiles(Doctor);
    return StatusCode(201);
}
[HttpPost("CreatePathalogy")]
 public async Task<IActionResult> CreatePathalogy( [FromBody] Client Client )
{
    var CreatePathalogy =await _repo.CreatePathalogy(Client);
    return StatusCode(201);
}
[HttpGet("getAllPathalogy")]
 public async Task<IActionResult> getAllPathalogy()
{
var CList=await _repo.getAllPathalogy();
 return Ok(CList);
 }
  [HttpGet]
 [Route("GetPathalogyinfoById/{cid:int}")]
 public async Task<ActionResult<Client>> GetPathalogyinfoById(int cid)
{
 var Clients =await _repo.GetPathalogyinfoById(cid);
return Ok(Clients);

}   
}
}