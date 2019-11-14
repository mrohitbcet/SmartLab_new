using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
using System.Collections.Generic;
namespace DatingApp.API.Models
{
    public class Client
    {
         [Key]
        public int CID { get; set; }
        [MaxLength(200)]
        public string CName { get; set; }
        public List<Doctor> Doctor {get;set;}
        public List<User> User {get;set;}
    }
}

