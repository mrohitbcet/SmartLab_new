using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace DatingApp.API.Models
{
    public class Patient
    {
     [Key]
     public int Id { get; set; }
    public int CID { get; set; }
     [MaxLength(100)]
    public string OPD{get;set;}
    [MaxLength(100)]
     public string name{get;set;}
     [MaxLength(10)]
     public string gender{get;set;}
     [MaxLength(100)]
    public string dateofbirth { get; set;}
    public int DRrefby{get;set;}
    [MaxLength(200)]
    public string email{get;set;}
    [MaxLength(500)]
    public string address{get;set;}
    [MaxLength(100)]
     public string city{get;set;}
     [MaxLength(40)]
     public string contactNo{get;set;}
    [ForeignKey("PatientID")]
     public List<Report> Report{get;set;}
 
    }
}