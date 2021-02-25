using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using Code7.Infrastructure.Interfaces;
using MongoDB.Driver;

namespace Code7.Infrastructure.Repository
{
   

    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IMongoContext context) : base(context)
        {
        }
    }
}
