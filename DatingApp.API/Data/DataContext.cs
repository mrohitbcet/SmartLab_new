using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        { }
        public DbSet <Value> Values {get;set;}
        public DbSet <Employee> Employee{get;set;}
        public DbSet<User> Users{get;set;}
        public DbSet <Patient> Patients {get;set;}
        public DbSet <Doctor> Doctors {get;set;}
        public DbSet <GroupMaster> GroupMasters {get;set;}
        public DbSet <TestMaster> TestMasters {get;set;}
        public DbSet<Client> Clients{get;set;}
    }
}