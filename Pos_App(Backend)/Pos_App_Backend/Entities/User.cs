using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Pos_App_Backend.Entities
{
    public class User
    {
        [BsonId]
        [BsonElement("_id")]

        public string? UserId { get; set; }
        [BsonElement("username"), BsonRepresentation(BsonType.String)]
        public string UserName { get; set; }

        [BsonElement("email"), BsonRepresentation(BsonType.String)]
        public string Email { get; set; }

        [BsonElement("password"), BsonRepresentation(BsonType.String)]
        public string Password { get; set; }

        [BsonElement("verify"), BsonRepresentation(BsonType.Boolean)]
        public bool Verify { get; set; }
    }
}
