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
        private readonly IGeneric<UserMaster> _genericRepository;
        public UsersController(IGeneric<UserMaster> genericRepository)
        {
            _genericRepository = genericRepository;
        }

       


        [HttpGet]
        [Route("login")]
        public IHttpActionResult Login([System.Web.Http.FromUri]UserMaster user)
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
                throw new System.Exception("Details you have provided its not valid");
            }
           

        }


        [HttpPost]
        [Route("create")]
        public IHttpActionResult AddUser([FromBody]UserMaster user)
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

        [HttpPost]
        [Route("update")]
        public IHttpActionResult UpdateUser([FromBody]UserMaster user)
        {
            try
            {
                var obj=_genericRepository.GetById(user.Id);
                obj.Name = user.Name;
                obj.Email = user.Email;
                obj.Address = user.Address;
                obj.Designation = user.Designation;
                obj.Organization = user.Organization;
                obj.MobileNo = user.MobileNo;
                obj.About = user.About;
                obj.Skill = user.Skill;
                obj.RatePerhours = user.RatePerhours;
                _genericRepository.Update(obj);
                if (user != null)
                {
                    var res = new ApiResponse()
                    {
                        status = HttpStatusCode.OK.ToString(),
                        code = (int)HttpStatusCode.OK,
                        result = user
                    };
                    return Ok(res);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
           

        }

        [HttpGet]
        [Route("get")]
        public IHttpActionResult GetUser([System.Web.Http.FromUri]int userId)
        {
            var ddd = _genericRepository.GetById(userId);
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
