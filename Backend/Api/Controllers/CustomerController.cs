using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            //var users = _customerService.ListAll();

            //return users;

            var customers = _customerService.ListAllApi();

            return _customerService.AddCustomersFromApi(customers?.ToList()); ;

        }

        [HttpGet]
        [Route("MockUsers")]
        public IEnumerable<Customer> GetAllApi()
        {
            var customers = _customerService.ListAllApi();

            return _customerService.AddCustomersFromApi(customers?.ToList()); ;
        }

        [HttpGet("{id}")]
        public Customer Get(Guid id)
        {
            return _customerService.GetById(id);
        }

        [HttpPost]
        public void Post([FromBody] Customer value)
        {
            var arePosted = _customerService.Add(value);
        }

        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] Customer value)
        {
            var areUpdated = _customerService.Update(value);
        }

        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            var areRemoved = _customerService.Remove(id);
        }
    }
}
