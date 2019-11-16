using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
using System.Collections.Generic;
namespace DatingApp.API.Models
{
    public class ReportDetails
    {   [Key] 
        public int RptDetailsID { get; set; }
        public int ReportID { get; set; }
        public int GroupId { get; set; }
        public int TestId { get; set; }
        [MaxLength(100)]
        public string TestValue { get; set; }
        public bool isHighlight { get; set; }
         public Report Report{get;set;}
         public GroupMaster GroupMaster{get;set;}
     }
}

