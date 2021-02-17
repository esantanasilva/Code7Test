using Code7.Domain.Abstractions;
using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Code7.Service.Services
{
    public class DebtService : BaseService<Debt>, IDebtService
    {
        private readonly ICustomerService _customerService;
        private readonly IDebtRepository _debtRepository;
        public DebtService(IDebtRepository debtRepository, ICustomerService customerService) : base(debtRepository)
        {
            _customerService = customerService;
            _debtRepository = debtRepository;
        }

        public override Debt Add(Debt entity)
        {
            var customer = _customerService.GetById(entity.CustomerId);
            
            if(customer == null) return null;

            return _debtRepository.Add(entity);
        }

        public IEnumerable<Debt> GetDebtsByCustomer(Guid id)
        {
            var debts = _debtRepository.GetAll().Where( x => x.CustomerId == id).ToList();

            return debts;

        }
    }
}
