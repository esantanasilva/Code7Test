using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using Code7.Infrastructure.Interfaces;

namespace Code7.Infrastructure.Repository
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(IMongoContext context) : base(context)
        {
        }
    }
}
