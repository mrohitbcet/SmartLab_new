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
         [MaxLength(100)]
        public string Doctorname { get; set; }
       public Client Client{get;set;}
  
    }
}

