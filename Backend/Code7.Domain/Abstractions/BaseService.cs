using Code7.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Code7.Domain.Abstractions
{
    public abstract class BaseService<TEntity> : IService<TEntity> where TEntity : Entity
    {
        protected readonly IRepository<TEntity> _repository;
        protected BaseService(IRepository<TEntity> repository)
        {
            _repository = repository;
        }

        public virtual TEntity Add(TEntity entity)
        {
            return _repository.Add(entity);
        }

        public IEnumerable<TEntity> AddMany(List<TEntity> entities)
        {
            return _repository.AddMany(entities);
        }

        public TEntity GetById(Guid id)
        {
            return _repository.GetById(id);
        }

        public IEnumerable<TEntity> ListAll()
        {
            return _repository.GetAll();
        }

        public bool Remove(Guid id)
        {
            return _repository.Remove(id);
        }

        public bool Update(TEntity entity)
        {
            return _repository.Update(entity);
        }
    }

}
