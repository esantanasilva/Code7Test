using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        private readonly ILogger<HealthController> _logger;

        public HealthController(ILogger<HealthController> logger)
        {
            _logger = logger;
        }
        // GET: api/<HealthController>
        [HttpGet]
        public string Get()
        {
            _logger.LogInformation($"Checking Health");
            return $"Api Rodando em: {this.Request.Host} -  {DateTime.Now.ToLongDateString()}";
        }
    }
}
