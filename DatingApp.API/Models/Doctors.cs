using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
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

