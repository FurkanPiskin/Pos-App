using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Pos_App_Backend.Data;
using Pos_App_Backend.Entities;

namespace Pos_App_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<User> _user;
        public UserController(MongoDbService mongoDbservice)
        {
            _user = mongoDbservice.Database?.GetCollection<User>("user");

        }
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _user.Find(FilterDefinition<User>.Empty).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetById(string id)
        {
            var objectId = new ObjectId(id).ToString(); // string id'yi ObjectId'ye dönüştürüyoruz
            var filter = Builders<User>.Filter.Eq(x => x.UserId, objectId); // Id ObjectId olarak karşılaştırılıyor
            var customer = _user.Find(filter).FirstOrDefault();
            return customer is not null ? Ok(customer) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Post(User user)
        {
            user.UserId = ObjectId.GenerateNewId().ToString();
            await _user.InsertOneAsync(user);
            return CreatedAtAction(nameof(GetById), new { id = user.UserId }, user);
        }


        [HttpDelete("all")]
        public async Task<ActionResult> DeleteAllUsers()
        {
            await _user.DeleteManyAsync(FilterDefinition<User>.Empty);
            return Ok("All customers deleted.");

        }

    }
}
