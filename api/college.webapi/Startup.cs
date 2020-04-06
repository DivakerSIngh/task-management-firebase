using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;


[assembly: OwinStartup(typeof(college.webapi.Startup), "Configuration")]

namespace college.webapi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
          
            var httpConfig = new HttpConfiguration();
            var cors = new EnableCorsAttribute(ConfigurationManager.AppSettings["signalrCorsUrl"].ToString(), "*", "*");
            httpConfig.EnableCors(cors);

            SignalRConfig.Register(app, cors);

            WebApiConfig.Register(httpConfig);

           // app.Use(httpConfig);
           // app.MapSignalR<TaskHub>();
           
            //var hubConfiguration = new HubConfiguration
            //{
            //    EnableDetailedErrors = true
            //};
            //app.MapSignalR("/notify",hubConfiguration);

            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
        }
    }
    public static class SignalRConfig
    {
        public static void Register(IAppBuilder app, EnableCorsAttribute cors)
        {

            app.Map("/signalr", map =>
{
                var corsOption = new CorsOptions
                {
                    PolicyProvider = new CorsPolicyProvider
                    {
                        PolicyResolver = context =>
                        {
                            var policy = new CorsPolicy { AllowAnyHeader = true, AllowAnyMethod = true, SupportsCredentials = true };

                            // Only allow CORS requests from the trusted domains.
                            cors.Origins.ToList().ForEach(o => policy.Origins.Add(o));

                            return Task.FromResult(policy);
                        }
                    }
                };
                map.UseCors(corsOption).RunSignalR();
    
            });
        }
    }
}
