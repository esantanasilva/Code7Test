using Code7.Domain.Abstractions;

namespace Code7.Domain.Models
{
    public class User : Entity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        //public string Role { get; set; }
    }
}
