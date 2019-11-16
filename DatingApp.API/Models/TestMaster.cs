using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 
using System.Collections.Generic;
namespace DatingApp.API.Models
{
    public class TestMaster
    {
     [Key]  
     public int TestId { get; set; }
     [MaxLength(200)]
     public string TestName {get;set;}
     public int GroupId { get; set; }
     [MaxLength(100)]
    public string Unit { get; set; }
    [MaxLength(100)]
    public string NormalRange { get; set; }
     public decimal Price{get;set;}
     public GroupMaster GroupMaster{get;set;}
 
   }
}