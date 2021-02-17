using Code7.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Code7.Domain.Interfaces
{
    public interface IDebtService : IService<Debt>
    {
        IEnumerable<Debt> GetDebtsByCustomer(Guid id);
    }
}
