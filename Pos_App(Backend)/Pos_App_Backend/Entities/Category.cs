using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Pos_App_Backend.Entities
{
    public class Category
    {
        [BsonId]
        [BsonElement("_id")]
        public string CategoryId { get; set; } // ObjectId yerine string
        [BsonElement("category_title"), BsonRepresentation(BsonType.String)]
        public string Title { get; set; }
    }
}
