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
      public string PatientDOB {get;set;}
       public string PatientGender {get;set;}
      public int DoctorID {get;set;}
      public string DoctorName {get;set;}
      public string Status {get;set;}
      public System.DateTime CreatedDate {get;set;}
    }
    public class ReportInfo
    {
    public int RptDetailsID {get;set;}
    public string groupName {get;set;}
    public int TestId {get;set;}
    public string testName {get;set;}
    public string result {get;set;}
    public string normalRange {get;set;}
    public bool isHighlight{get;set;}
    }
}