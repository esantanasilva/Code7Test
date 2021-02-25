using Code7.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Code7.Domain.Interfaces
{
    public interface IUserService : IService<User>
    {
        bool Authenticate(User user);
    }
}
