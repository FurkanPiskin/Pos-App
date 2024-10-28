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
    public class BillController : ControllerBase
    {
        private readonly IMongoCollection<Bill> _bill;
        public BillController(MongoDbService mongoDbservice)
        {
            _bill = mongoDbservice.Database?.GetCollection<Bill>("bill");

        }
        [HttpGet]
        public async Task<IEnumerable<Bill>> Get()
        {
            return await _bill.Find(FilterDefinition<Bill>.Empty).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetById(string id)
        {
            // string id'yi ObjectId'ye dönüştürüyoruz
            var filter = Builders<Bill>.Filter.Eq(x => x.BillId, id); // Id ObjectId olarak karşılaştırılıyor
            var customer = _bill.Find(filter).FirstOrDefault();
            return customer is not null ? Ok(customer) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Post(Bill bill)
        {
            bill.BillId = ObjectId.GenerateNewId().ToString();
            bill.CreatedAt = DateTime.Now;
            await _bill.InsertOneAsync(bill);
            return CreatedAtAction(nameof(GetById), new { id = bill.BillId }, bill);
        }


        [HttpDelete("all")]
        public async Task<ActionResult> DeleteAllBills()
        {
            await _bill.DeleteManyAsync(FilterDefinition<Bill>.Empty);
            return Ok("All customers deleted.");

        }
    }
}
