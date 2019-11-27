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
        [MaxLength(500)]
         public string Address { get; set; }
        [MaxLength(200)]
        public string Email{get;set;}
         [MaxLength(100)]
        public string Contact{get;set;}
        public List<Doctor> Doctor {get;set;}
        public List<User> User {get;set;}
        public List<Report> Report{get;set;}
       }
        
    }


