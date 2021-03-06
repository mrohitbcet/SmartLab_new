using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
using System.Collections.Generic;
namespace DatingApp.API.Models
{
    public class GroupMaster
    {
      [Key]  
        public int GroupId{get;set;}
        [MaxLength(100)]
        public string GroupName{get;set;}
         [MaxLength(20)]
        public string ShortName{get;set;}
        public bool HideNormalvalue{get;set;}
        public List<TestMaster> TestMaster{get;set;}
        public List<ReportDetails> ReportDetails{get;set;}
        
    }
}