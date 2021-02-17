using Code7.Domain.Abstractions;
using Code7.Domain.Interfaces;
using System;

namespace Code7.Domain.Models
{
    public class Debt: Entity
    {
        public decimal Amount { get; set; }
        public DateTime DebtDate { get; set; }
        public string Reason { get; set; }
        public Guid CustomerId { get; set; } 
    }
}
