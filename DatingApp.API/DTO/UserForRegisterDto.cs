using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class UserForRegisterDto
    { public int Id { get; set; }
      public string Username { get; set; }
      public string password { get; set; }
       public int CID { get; set; }
       public string CName { get; set; }
       public string Email { get; set; }
       public System.DateTime AccountExpiryDate { get; set; }
 }
}