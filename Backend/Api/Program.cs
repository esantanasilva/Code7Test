using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;
using Serilog;
namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Serilog.Log.Information("Iniciando Web Host");
            CreateHostBuilder(args).Build().Run();
            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
               .ConfigureAppConfiguration((hostingContext, config) =>
               {
                   var settings = config.Build();
                   Serilog.Log.Logger = new LoggerConfiguration()
                       .Enrich.FromLogContext()
                       //.WriteTo.MongoDB(settings.GetSection("BaseLog"), collectionName: "LogAPI")
                       .CreateLogger();
               })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                }).UseSerilog();
    }
}
