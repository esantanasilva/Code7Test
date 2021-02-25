using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DebtController : ControllerBase
    {
        private IDebtService _debtService;
        public DebtController(IDebtService debtService)
        {
            _debtService = debtService;
        }

        [HttpGet]
        public IEnumerable<Debt> Get()
        {
            return _debtService.ListAll();
        }

        [HttpGet("{id}")]
        public Debt Get(Guid id)
        {
            return _debtService.GetById(id);
        }

        [HttpGet]
        [Route("customer/{customerId}")]
        public IEnumerable<Debt> GetByCustomer(Guid customerId)
        {
            return _debtService.GetDebtsByCustomer(customerId);
        }

        [HttpPost]
        public Debt Post([FromBody] Debt value)
        {
            return _debtService.Add(value);
        }

        [HttpPut]
        public bool Put([FromBody] Debt value)
        {
            return _debtService.Update(value);
        }

        [HttpDelete("{id}")]
        public bool Delete(Guid id)
        {
            return _debtService.Remove(id);
        }
    }
}
