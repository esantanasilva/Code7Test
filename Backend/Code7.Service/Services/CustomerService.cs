using Code7.Domain.Models;
using Code7.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using Code7.Domain.Abstractions;
using System.Linq;

namespace Code7.Service.Services
{
    public class CustomerService : BaseService<Customer>, ICustomerService
    {
        private readonly string _api;
        private readonly string _userResource;

        public CustomerService(ICustomerRepository customerRepository, IConfiguration configuration) : base(customerRepository)
        {
            _api = configuration["JsonPlaceHolderApi:BaseUrl"];
            _userResource = configuration["JsonPlaceHolderApi:UserResource"];
        }
        public IEnumerable<Customer> ListAllApi()
        {
            var client = new RestClient(_api);
            var request = new RestRequest(_userResource, Method.GET, DataFormat.Json);
            var result = client.Execute(request);

            return JsonConvert.DeserializeObject<List<Customer>>(result.Content);
        }

        IEnumerable<Customer> ICustomerService.AddCustomersFromApi(List<Customer> values)
        {
            var dataBaseCustomers = ListAll();

            var newsCustomers = values?.Where(p => !dataBaseCustomers.Any(l => p.ExternalId == l.ExternalId)).ToList();

            if (newsCustomers?.Count > 0)
            {
                dataBaseCustomers = AddMany(newsCustomers).ToList();
            }

            return dataBaseCustomers;
        }
    }
}
