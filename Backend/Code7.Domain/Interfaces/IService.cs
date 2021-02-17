using System;
using System.Collections.Generic;

namespace Code7.Domain.Interfaces
{
    public interface IService<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> ListAll();
        TEntity Add(TEntity entity);
        IEnumerable<TEntity> AddMany(List<TEntity> entities);
        bool Remove(Guid id);
        bool Update(TEntity entity);
        TEntity GetById(Guid id);
    }
}
