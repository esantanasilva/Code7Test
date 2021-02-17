using MongoDB.Driver;
using System;

namespace Code7.Infrastructure.Interfaces
{
    public interface IMongoContext : IDisposable
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}
