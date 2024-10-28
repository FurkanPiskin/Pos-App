using MongoDB.Driver;
using Pos_App_Backend.Data;
using Pos_App_Backend.Entities;

namespace Pos_App_Backend.Repository
{
    public interface IUserRepository
    {
        User GetUserByEmail(string email);
        IEnumerable<User> GetAllUsers();
    }

    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _users;

        public UserRepository(MongoDbService mongoDbService)
        {
            _users = _users = mongoDbService.Database.GetCollection<User>("user");
        }

        public User GetUserByEmail(string email)
        {
            return _users.Find(user => user.Email == email).FirstOrDefault();
        }
        public IEnumerable<User> GetAllUsers()
        {
            return _users.Find(user => true).ToList(); // Tüm kullanıcıları döndür
        }
    }
}
