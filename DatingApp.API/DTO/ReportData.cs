using DatingApp.API.Models;
using System.Collections.Generic;
namespace DatingApp.API.DTO
{
   public class ReportData
    {
     public Report Report { get; set; }
     public List<ReportDetails> ReportDetails { get; set; }
    }
    public class AllReportsInfo{
      public int ReportID {get;set;}
      public string PatientName {get;set;}
      public int DoctorID {get;set;}
      public string DoctorName {get;set;}
      public string Status {get;set;}
      public System.DateTime CreatedDate {get;set;}
    }
}