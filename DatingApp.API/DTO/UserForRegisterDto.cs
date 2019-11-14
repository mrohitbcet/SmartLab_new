using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class UserForRegisterDto
    { public string Username { get; set; }
      public string password { get; set; }
       public int CID { get; set; }
       public string Email { get; set; }
       
 }
}