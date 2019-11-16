using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
using System.Collections.Generic;
namespace DatingApp.API.Models
{
    public class Report
    { public int ReportID { get; set; }
        [ForeignKey("PatientID")]
         public int PatientID { get; set; }
         public int DoctorID { get; set; }
         public int CID { get; set; }
        [MaxLength(100)]
        public string CreatedBy { get; set; }
        [MaxLength(50)]
        public string Status { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Patient Patient{get;set;}
        public List<ReportDetails> ReportDetails{get;set;}
      
      
        }
}

