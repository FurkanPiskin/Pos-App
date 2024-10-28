using Pos_App_Backend.Entities;

namespace Pos_App_Backend.Repository
{
    public interface IUserRepository2
    {
        User GetUserByEmail(string email);
    }
}
