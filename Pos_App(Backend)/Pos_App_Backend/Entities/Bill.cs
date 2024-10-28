using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Pos_App_Backend.Entities
{
    public class Bill
    {
        [BsonId]
        [BsonElement("_id")]
        public string? BillId { get; set; }
        [BsonElement("customerName"), BsonRepresentation(BsonType.String)]
        public string CustomerName { get; set; }

        [BsonElement("customerPhoneNumber"), BsonRepresentation(BsonType.String)]
        public string PhoneNumber { get; set; }

        [BsonElement("paymentMode"), BsonRepresentation(BsonType.String)]
        public string PaymentMode { get; set; }

        [BsonElement("subTotal"), BsonRepresentation(BsonType.Int32)]
        public int SubTotal { get; set; }

         [BsonElement("cartItems")] // BsonRepresentation gerekmiyor
          public Item[] CartItems { get; set; }
        [BsonElement("tax"), BsonRepresentation(BsonType.Double)]
        public float Tax { get; set; }

        [BsonElement("totalAmount"), BsonRepresentation(BsonType.Double)]
        public float TotalAmount { get; set; }

        [BsonElement("CreatedAt"),BsonRepresentation(BsonType.DateTime)]
        public DateTime CreatedAt { get; set; }
    }
    public class Item
    {
        [BsonElement("_id")]
        public string productId { get; set; }

        [BsonElement("category")]
        public string category { get; set; }

        [BsonElement("product_title")]
        public string title { get; set; }

        [BsonElement("product_img")]
        public string img { get; set; }

        [BsonElement("quantity"), BsonRepresentation(BsonType.Int32)]
        public int quantity { get; set; }

        [BsonElement("price"), BsonRepresentation(BsonType.Double)]
        public double Price { get; set; }
    }
}

