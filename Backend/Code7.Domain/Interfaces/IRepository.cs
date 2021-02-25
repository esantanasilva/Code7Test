using System;
using System.Collections.Generic;

namespace Code7.Domain.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : class
    {
        TEntity Add(TEntity obj);
        IEnumerable<TEntity> AddMany(List<TEntity> lobj);
        TEntity GetById(Guid id);
        IEnumerable<TEntity> GetAll();
        bool Update(TEntity obj);
        bool Remove(Guid id);

        IEnumerable<TEntity> GetByField(string field, string value);
    }
}
