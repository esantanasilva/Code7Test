using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using Code7.Infrastructure.Interfaces;

namespace Code7.Infrastructure.Repository
{

    public class DebtRepository : BaseRepository<Debt>, IDebtRepository
    {
        public DebtRepository(IMongoContext context) : base(context)
        {
        }
    }
    
}
