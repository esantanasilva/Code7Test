using System;
using System.Collections.Generic;
using System.Text;

namespace Code7.Domain.Interfaces
{
    public interface IMongoSettings
    {
         string Host { get; set; }
         string Port { get; set; }
         string DatabaseName { get; set; }

        string GetConnectionString();

    }
}
