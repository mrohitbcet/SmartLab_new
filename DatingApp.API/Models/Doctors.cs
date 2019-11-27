using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace DatingApp.API.Models
{
    public class Doctor
    {
         [Key]
        public int DoctorID { get; set; }
        public int CID { get; set; }
         [MaxLength(200)]
        public string Doctorname { get; set; }
         [MaxLength(100)]
         public string RegistrationNo { get; set; }
        [MaxLength(200)]
        public string Email{get;set;}
         [MaxLength(100)]
        public string Contact{get;set;}
         public Client Client{get;set;}
  
    }
}

