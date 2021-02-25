using Code7.Domain.Abstractions;
using Code7.Domain.Interfaces;
using Code7.Infrastructure.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Code7.Infrastructure.Repository
{
    public abstract class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        protected readonly IMongoContext Context;
        protected IMongoCollection<TEntity> DbSet;

        protected BaseRepository(IMongoContext context)
        {
            Context = context;

            DbSet = Context.GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public virtual TEntity Add(TEntity obj)
        {
            obj.CreatedAt = DateTime.Now;
            DbSet.InsertOne(obj);
            return obj;
            
        }

        public IEnumerable<TEntity> AddMany(List<TEntity> lobj)
        {
            lobj.ForEach(x => x.CreatedAt = DateTime.Now);
            DbSet.InsertMany(lobj);
            return lobj;
        }

        public virtual TEntity GetById(Guid id)
        {
            var data =  DbSet.Find(Builders<TEntity>.Filter.Eq("_id", id));
            return data.SingleOrDefault();
        }

        public virtual  IEnumerable<TEntity> GetAll()
        {
            var all = DbSet.Find(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        public virtual bool Update(TEntity obj)
        {
            obj.UpddatedAt = DateTime.Now;
            var replacementResult = DbSet.ReplaceOne(Builders<TEntity>.Filter.Eq("_id", obj.id), obj);
            return replacementResult.ModifiedCount > 0;
        }

        public virtual bool Remove(Guid id)
        {
            var deleteResult = DbSet.DeleteOne(Builders<TEntity>.Filter.Eq("_id", id));
            return deleteResult.DeletedCount > 0;
        }
        public IEnumerable<TEntity> GetByField(string field, string value)
        {
            return DbSet.Find(Builders<TEntity>.Filter.Eq(field, value)).ToList();
        }

        public void Dispose()
        {
            Context?.Dispose();
        }

        
    }
}
