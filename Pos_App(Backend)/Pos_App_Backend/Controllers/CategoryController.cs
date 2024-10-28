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
    public class CategoryController : ControllerBase
    {
        private readonly IMongoCollection<Category> _categories;
        public CategoryController(MongoDbService mongoDbservice)
        {
            _categories = mongoDbservice.Database?.GetCollection<Category>("category");

        }
        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            return await _categories.Find(FilterDefinition<Category>.Empty).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetById(string id)
        {
            // string id'yi doğrudan kullanıyoruz
            var filter = Builders<Category>.Filter.Eq(x => x.CategoryId, id); // CategoryId string olarak karşılaştırılıyor
            var category = await _categories.Find(filter).FirstOrDefaultAsync(); // Asenkron olarak sorguluyoruz

            return category is not null ? Ok(category) : NotFound(); // Eğer bulursa döndür, bulamazsa NotFound döndür
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, Category category)
        {
            // `CategoryId`yi güncellenen nesneye atıyoruz
            category.CategoryId = id;

            // Filtreleme işlemi için `CategoryId` üzerinden sorgulama yapıyoruz
            var filter = Builders<Category>.Filter.Eq(c => c.CategoryId, id);

            // Güncellemeyi yapıyoruz
            var result = await _categories.ReplaceOneAsync(filter, category);

            if (result.MatchedCount == 0)
            {
                return NotFound(); // Eğer eşleşen kayıt yoksa 404 Not Found döndür
            }

            return NoContent(); // Başarılı güncelleme için 204 No Content döndür
        }

        [HttpPost]
        public async Task<ActionResult> Post(Category category)
        {
            category.CategoryId = ObjectId.GenerateNewId().ToString();
            await _categories.InsertOneAsync(category);
            return CreatedAtAction(nameof(GetById), new { id = category.CategoryId }, category);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOneCategory(string id)
        {
            // Silinecek kategorinin id'sini string olarak alıyoruz
            var filter = Builders<Category>.Filter.Eq(x => x.CategoryId, id); // Filter oluşturuyoruz

            // Silme işlemini gerçekleştiriyoruz
            var deleteResult = await _categories.DeleteOneAsync(filter); // Asenkron olarak silme işlemi

            // Eğer silinen belge varsa, başarılı bir şekilde silindi mesajı döndür
            if (deleteResult.DeletedCount > 0)
            {
                return NoContent(); // 204 No Content
            }

            return NotFound(); // Eğer hiçbir belge silinmediyse, Not Found döndür
        }



        [HttpDelete("all")]
        public async Task<ActionResult> DeleteAllCategories()
        {
            await _categories.DeleteManyAsync(FilterDefinition<Category>.Empty);
            return Ok("All customers deleted.");
        }
    }
}
