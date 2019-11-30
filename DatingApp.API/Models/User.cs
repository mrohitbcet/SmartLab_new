using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
using System.Collections.Generic;
namespace DatingApp.API.Models
{
    public class User
    {
    public int Id { get; set; }
    public int CID { get; set; }
    
    [MaxLength(10)]
    public string Role { get; set; }
   public string Username{get;set;}
    [MaxLength(200)]
   public string Email{get;set;}
    public byte[] PasswordHash{get;set;}
    public byte[] PasswordSalt{get;set;}
    public bool isActive { get; set; }
     public System.DateTime CreatedDate { get; set; }
     public System.DateTime AccountExpiryDate { get; set; }
    public Client Client{get;set;}
    }
}