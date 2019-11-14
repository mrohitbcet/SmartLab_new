using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace DatingApp.API.Models
{
    public class Employee
    {
       [Key]
        public int employee_number { get; set; }
        [MaxLength(100)]
        public string employee_name { get; set; }
    }
}