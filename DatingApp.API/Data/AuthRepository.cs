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
            if (user == null)
                return null;
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
             return null;
            return user;

        }
        //private readonly byte[] passwordSalt;

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
            user.CreatedDate=System.DateTime.Now;
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
         var ClientsDto=await (_context.Clients.Select(xx=>new ClientsDto{CID=xx.CID,CName=xx.CName})).ToListAsync();
         return ClientsDto;

        }
     public async Task<Client> GetPathalogyinfoById(int cid)
        { var Clients= await _context.Clients.FindAsync(cid);
         return Clients;
          }
    }
}