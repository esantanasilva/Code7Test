using Code7.Domain.Abstractions;
using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using System.Collections.Generic;
using System.Linq;

namespace Code7.Service.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository) : base(userRepository)
        {
            _userRepository = userRepository;
        }

     
        public override User Add(User entity)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(entity.Password);
            entity.Password = passwordHash;
            return base.Add(entity);
        }

        public bool Authenticate(User user)
        {
            var user1 = _userRepository.GetByField("Email", user.Email).SingleOrDefault();

            if (user1 == null) return false;

            bool verified = BCrypt.Net.BCrypt.Verify(user.Password, user1.Password);

            return verified;
        }
    }
}
