using Code7.Domain.Interfaces;

namespace Code7.Domain.Models
{
    public class MongoSettings : IMongoSettings
    {
        public string Host { get; set; }
        public string Port { get; set; }
        public string DatabaseName { get; set; }

        public string GetConnectionString()
        {
            return $@"mongodb://{Host}:{Port}";
        }
    }
}
