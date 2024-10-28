using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;
using Pos_App_Backend.Data;
using Pos_App_Backend.Entities;
using System;

namespace Pos_App_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMongoCollection<Customer> _customers;
        public CustomerController(MongoDbService mongoDbservice)
        {
            _customers = mongoDbservice.Database?.GetCollection<Customer>("customer");

        }
        [HttpGet]
        public async Task<IEnumerable<Customer>> Get()
        {
            return await _customers.Find(FilterDefinition<Customer>.Empty).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetById(string id)
        {
            var objectId = new ObjectId(id); // string id'yi ObjectId'ye dönüştürüyoruz
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, objectId); // Id ObjectId olarak karşılaştırılıyor
            var customer = _customers.Find(filter).FirstOrDefault();
            return customer is not null ? Ok(customer) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Post(Customer customer)
        {
            customer.Id = ObjectId.GenerateNewId();
            await _customers.InsertOneAsync(customer);
            return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Customer customer)
        {
            var filter=Builders<Customer>.Filter.Eq(x=>x.Id,customer.Id);
            // var update = Builders<Customer>.Update
            //     .Set(x => x.CustomerName, customer.CustomerName)
            //     .Set(x => x.Email, customer.Email);
            // await _customers.UpdateOneAsync(filter,update);

            await _customers.ReplaceOneAsync(filter, customer);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {

            var objectId = new ObjectId(id);
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, objectId);
            var result=await _customers.DeleteOneAsync(filter);
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpDelete("all")]
        public async Task<ActionResult> DeleteAllCustomers()
        {
            await _customers.DeleteManyAsync(FilterDefinition<Customer>.Empty);
            return Ok("All customers deleted.");
        }



    }
}
