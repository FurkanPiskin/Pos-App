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
    public class ProductController : ControllerBase
    {
        private readonly IMongoCollection<Product> _products;
        public ProductController(MongoDbService mongoDbservice)
        {
            _products = mongoDbservice.Database?.GetCollection<Product>("product");

        }
        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {
            return await _products.Find(FilterDefinition<Product>.Empty).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetById(string id)
        {
           // string id'yi ObjectId'ye dönüştürüyoruz
            var filter = Builders<Product>.Filter.Eq(x => x.ProductId, id); // Id ObjectId olarak karşılaştırılıyor
            var product = _products.Find(filter).FirstOrDefault();
            return product is not null ? Ok(product) : NotFound();
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, Product product)
        {
            // `CategoryId`yi güncellenen nesneye atıyoruz
            product.ProductId = id;

            // Filtreleme işlemi için `CategoryId` üzerinden sorgulama yapıyoruz
            var filter = Builders<Product>.Filter.Eq(c => c.ProductId, id);

            // Güncellemeyi yapıyoruz
            var result = await _products.ReplaceOneAsync(filter, product);

            if (result.MatchedCount == 0)
            {
                return NotFound(); // Eğer eşleşen kayıt yoksa 404 Not Found döndür
            }

            return NoContent(); // Başarılı güncelleme için 204 No Content döndür
        }

        [HttpPost]
        public async Task<ActionResult> Post(Product product)
        {
            product.ProductId = ObjectId.GenerateNewId().ToString();
            await _products.InsertOneAsync(product);
            return CreatedAtAction(nameof(GetById), new { id = product.ProductId }, product);
        }
       

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteById(string id)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.ProductId, id);
            var deleteResult = await _products.DeleteOneAsync(filter);

            if (deleteResult.DeletedCount == 0)
            {
                // Eğer silme işlemi başarısız olduysa (yani silinecek ürün yoksa)
                return NotFound(new { message = "Ürün bulunamadı." });
            }

            // Silme işlemi başarılı olduysa
            return Ok(new { message = "Ürün başarıyla silindi." });
        }

        [HttpDelete("all")]
        public async Task<ActionResult> DeleteAllProducts()
        {
            await _products.DeleteManyAsync(FilterDefinition<Product>.Empty);
            return Ok("All customers deleted.");
        }

    }
}
