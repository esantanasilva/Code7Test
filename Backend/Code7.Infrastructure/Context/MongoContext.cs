using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using Code7.Infrastructure.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;


namespace Code7.Infrastructure.Context
{

    public class MongoContext : IMongoContext
    {
        private IMongoDatabase Database { get; set; }
        public IClientSessionHandle Session { get; set; }
        public MongoClient MongoClient { get; set; }
        private readonly ILogger<MongoContext> _logger;
        private readonly IMongoSettings _settings;

        public MongoContext(IMongoSettings settings, ILogger<MongoContext> logger)
        {
            _logger = logger;
            _settings = settings;
        }

        private void ConfigureMongo()
        {
            if (MongoClient != null)
            {
                return;
            }

            _logger.LogInformation($"trying to connect on mongo {_settings.GetConnectionString()},  database {_settings.DatabaseName}");

            MongoClient = new MongoClient(_settings.GetConnectionString());
            Database = MongoClient.GetDatabase(_settings.DatabaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            ConfigureMongo();

            return Database.GetCollection<T>(name);
        }

        public void Dispose()
        {
            Session?.Dispose();
            GC.SuppressFinalize(this);
        }

    }
}
