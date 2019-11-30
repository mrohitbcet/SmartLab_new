using System;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic; 

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            this._context = context;

        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(xx => xx.Username == username);
            if(user.Role=="U" && user.AccountExpiryDate < System.DateTime.Now)
                return null;
            if (user == null)
                return null;
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
             return null;
            return user;

        }
       

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var ComputeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < ComputeHash.Length; i++)
                {
                    if (ComputeHash[i] != passwordHash[i]) return false;
                }

            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.CID=user.CID;
            user.Email=user.Email;
            user.isActive=true;
            user.Role="U";
            user.CreatedDate=System.DateTime.Now;
            user.AccountExpiryDate=System.DateTime.Today.AddDays(10);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }

        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(xx=>xx.Username==username))
            return true;

            return false;
        }
         public async Task<bool> Changepassword(UserForRegisterDto UserForRegisterDto)
        {
              byte[] passwordHash, passwordSalt;
                CreatePasswordHash(UserForRegisterDto.password, out passwordHash, out passwordSalt);
                   var user= new User
                {
                    Id=UserForRegisterDto.Id,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt
                   
                };
                  if(user.Id==null)
                 return false;
                 else
                 { 
                _context.Entry(user).Property(x => x.PasswordHash).IsModified = true;
                _context.Entry(user).Property(x => x.PasswordSalt).IsModified = true;
                 await _context.SaveChangesAsync();
                return true;
                }   
        }
        public async Task<bool> UpdateAccountExpiryDate(UserForRegisterDto UserForRegisterDto)
        {
              var user= new User
            {
                Id=UserForRegisterDto.Id,
                Username = UserForRegisterDto.Username,
                CID=UserForRegisterDto.CID,
                Email=UserForRegisterDto.Email,
                AccountExpiryDate=UserForRegisterDto.AccountExpiryDate
            };
        if(user.Id==null)
             return false;
        else
        { 
        _context.Entry(user).Property(x => x.AccountExpiryDate).IsModified = true;
         await _context.SaveChangesAsync();
           return true;
         }    
        }

       public async Task<IEnumerable<UserForRegisterDto>> GetAllUsers()
        {
             var UserList=await (_context.Users.Where(xx=>xx.Role=="U").Join(_context.Clients,
            user=>user.CID,
            client=>client.CID,
            (user,client)=>new UserForRegisterDto{
                                            Id=user.Id,
                                             Username=user.Username,
                                            Email=user.Email,
                                            AccountExpiryDate=user.AccountExpiryDate,
                                            CName=client.CName
          })
            .OrderByDescending(user=>user.AccountExpiryDate)
            ).ToListAsync();
        
        return UserList; 
      }

        public async Task<bool> CreateDocProfiles(Doctor Doctor)
        {
             if(Doctor.DoctorID>0)
            {
                if(await _context.Doctors.AnyAsync(xx=>xx.DoctorID==Doctor.DoctorID))
                {
                _context.Entry(Doctor).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                }
            }
            else
            {
            var user = await _context.Doctors.AddAsync(Doctor);
            await _context.SaveChangesAsync(); 
            }
            
            return true;
        }

  public async Task<bool> CreatePathalogy(Client Client)
        {
             if(Client.CID>0)
            {
                if(await _context.Clients.AnyAsync(xx=>xx.CID==Client.CID))
                {
                _context.Entry(Client).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                }
            }
            else
            {
            var user = await _context.Clients.AddAsync(Client);
            await _context.SaveChangesAsync(); 
            }
            
            return true;
        }
     public async Task<IEnumerable<ClientsDto>> getAllPathalogy()
        {
         var ClientsDto=await (_context.Clients.Select(xx=>new ClientsDto{CID=xx.CID,
         CName=xx.CName,
         address=xx.Address,
         email=xx.Email,
         contact=xx.Contact
         })).ToListAsync();
         return ClientsDto;

        }
     public async Task<Client> GetPathalogyinfoById(int cid)
        { var Clients= await _context.Clients.FindAsync(cid);
         return Clients;
          }
    }
}