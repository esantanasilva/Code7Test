using Code7.Domain.Models;
using System.Collections.Generic;

namespace Code7.Domain.Interfaces
{
    public interface ICustomerService: IService<Customer>
    {
        IEnumerable<Customer> ListAllApi();
        IEnumerable<Customer> AddCustomersFromApi(List<Customer> values);
    }
}
