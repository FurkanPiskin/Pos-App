using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Pos_App_Backend.Entities
{
    public class Product
    {
        [BsonId]
        [BsonElement("_id")]
        public string ProductId { get; set; }
        [BsonElement("product_title"), BsonRepresentation(BsonType.String)]
        public string Title { get; set; }

        [BsonElement("product_image"), BsonRepresentation(BsonType.String)]
        public string Img {  get; set; }

        [BsonElement("product_price"), BsonRepresentation(BsonType.Int32)]
        public int Price { get; set; }

        [BsonElement("category"), BsonRepresentation(BsonType.String)]
        public string Category { get; set; } 
    }
}
