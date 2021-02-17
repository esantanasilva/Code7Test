
using Code7.Domain.Abstractions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

namespace Code7.Domain.Models
{
    [JsonObject("User")]
    public  class Customer: Entity
    {
        
        [JsonProperty(PropertyName = "id")]
        public int ExternalId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<Debt> Debts { get; set; }
        
    }
}
