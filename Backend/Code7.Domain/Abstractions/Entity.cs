using Code7.Domain.Interfaces;
using System;

namespace Code7.Domain.Abstractions
{
    public abstract class Entity:IEntity
    {
        public Guid id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpddatedAt { get; set; }
        public bool IsValid()
        {
            throw new NotImplementedException();
        }
    }
}
