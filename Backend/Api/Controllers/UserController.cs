using Code7.Domain.Interfaces;
using Code7.Domain.Models;
using Code7.Service.Services;
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
    public class UserController : ControllerBase
    {

        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("login")]
        public ActionResult<dynamic> Authenticate([FromBody] User user)
        {
            var isAutenticated = _userService.Authenticate(user);

            if (!isAutenticated)
                return NotFound(new { message = "Usuário e/ou senha inválidos" });

            var token = TokenService.GenerateToken(user);

            user.Password = "";

            return new
            {
                access_token = token
            };
        }

        [HttpPost]
        [Route("register")]
        public ActionResult<User> Post([FromBody] User value)
        {

            var duplicated = _userService.GetByEmail(value.Email);

            if(duplicated != null)
            {
                return BadRequest();
            }

            var inserted =  _userService.Add(value);
            if (inserted != null) inserted.Password = "";

            return new ActionResult<User>(inserted);
        }
    }
}
