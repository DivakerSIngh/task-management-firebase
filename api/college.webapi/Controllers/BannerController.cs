using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using college.@interface;
using college.models;


namespace college.webapi.Controllers
{

    [RoutePrefix("api/banner")]
    public class BannerController : ApiController
    {
        private IGeneric<Banner> _banner;

        public BannerController(IGeneric<Banner> genericRepository)
        {
            _banner = genericRepository;
        }
        [HttpGet]
        [Route("bannerimage")]
        public IHttpActionResult GetHomeBanner()
        {
            var lst = _banner.List().ToList();
            if (lst!=null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code =(int) HttpStatusCode.OK,
                    result = lst
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }

      
      

        
        [HttpGet]
        [Route("courseimage")]
        public IHttpActionResult GetCourseBanner()
        {
            var lst = _banner.Get(x => x.Type == (int)BanneType.course).ToList();
            if (lst != null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code =(int) HttpStatusCode.OK,
                    result = lst
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }
        [HttpGet]
        [Route("libraryimage")]
        public IHttpActionResult GetLibraryBanner()
        {
            var lst = _banner.Get(x => x.Type == (int)BanneType.library).ToList();
            if (lst != null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = lst
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }
        [HttpGet]
        [Route("eventsimage")]
        public IHttpActionResult GetEventBanner()
        {
            var lst = _banner.Get(x => x.Type == (int)BanneType.events).ToList();
            if (lst != null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = lst
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }
        [HttpGet]
        [Route("gallery")]
        public IHttpActionResult Gallery()
        {
            var lst = _banner.Get(x => x.Type == (int)BanneType.gallery).ToList();
            if (lst != null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = lst
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpGet]
        [Route("delete")]
        public IHttpActionResult Delete(int id)
        {
            var res = new ApiResponse();
            var dom = _banner.GetById(id);
            if (dom != null)
            {
                _banner.Delete(dom);
                res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = null
                };
            }
            else {
                res = new ApiResponse()
                {
                    status = HttpStatusCode.NotFound.ToString(),
                    code = (int)HttpStatusCode.NotFound,
                    result = "image Not found"
                };
            }
            return Ok(res);
          
        }
        
    }
}