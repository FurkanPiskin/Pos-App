using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Pos_App_Backend.Entities
{
    public class Customer
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public ObjectId? Id { get; set; } // Id'yi ObjectId olarak değiştiriyoruz

        [BsonElement("customer_name"), BsonRepresentation(BsonType.String)]
        public string? CustomerName { get; set; }

        [BsonElement("email"), BsonRepresentation(BsonType.String)]
        public string? Email { get; set; }
    }
}
