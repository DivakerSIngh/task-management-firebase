using System.Linq;
using System.Net;
using System.Web.Http;
using college.@interface;
using college.models;


namespace college.webapi.Controllers
{

    [RoutePrefix("api/user")]
    public class UsersController : ApiController
    {
        private readonly IGeneric<AdminUser> _genericRepository;
        public UsersController(IGeneric<AdminUser> genericRepository)
        {
            _genericRepository = genericRepository;
        }

       


        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login([FromBody]AdminUser user)
        {
      
            var dom = _genericRepository.Get(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();
            if (dom != null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = dom
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPost]
        [Route("create")]
        public IHttpActionResult AddUser([FromBody]AdminUser user)
        {
            var ddd = _genericRepository.Add(user);
            if (ddd != null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = ddd
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }




    }
}
