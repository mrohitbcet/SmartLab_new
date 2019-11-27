using System.Threading.Tasks;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using System.Collections.Generic; 

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user,string password);
         Task<User> Login(string username,string password);
         Task<bool> UserExists(string username);
         Task<bool> CreatePathalogy(Client Client);
          Task<bool> CreateDocProfiles(Doctor Doctor);
         Task<IEnumerable<ClientsDto>> getAllPathalogy();
        Task <Client> GetPathalogyinfoById(int cid);
       
    }
}