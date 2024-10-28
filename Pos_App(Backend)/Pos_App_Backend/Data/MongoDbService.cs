using MongoDB.Driver;

namespace Pos_App_Backend.Data
{
    public class MongoDbService
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoDatabase? _database;
        public MongoDbService(IConfiguration configuration)
        {
            _configuration = configuration;
            var connectionString = _configuration.GetConnectionString("DbConnection");
            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);

            // Veritabanı adı URI'de belirtilmemişse, manuel olarak ekleyin
            _database = !string.IsNullOrEmpty(mongoUrl.DatabaseName)
                        ? mongoClient.GetDatabase(mongoUrl.DatabaseName)
                        : mongoClient.GetDatabase("Pos_App"); // Veritabanı adı burada manuel olarak verilmeli
        }

        public IMongoDatabase? Database => _database;
    }
}
