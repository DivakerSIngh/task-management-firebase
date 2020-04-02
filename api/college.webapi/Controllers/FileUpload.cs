using college.@interface;
using college.models;
using college.models;
using System.Net;
using System.Web.Http;


namespace college.webapi.Controllers
{

    
         [RoutePrefix("api/fileUpload")]
    public class FileUploadController : ApiController
    {

        private IGeneric<Banner> _banner;


        public FileUploadController(IGeneric<Banner> genericRepository)
        {
            _banner = genericRepository;
        }

        [HttpPost]
        [Route("banner")]
        public IHttpActionResult Banner()
        {
            var banner = new Banner();
            try
            {
                var file = System.Web.HttpContext.Current.Request;
             var fileResult=  new BaseClass().UploadAsync(file.Files, "banner", 300, 900);
                  banner = new Banner()
                {
                    ImgUrl = fileResult.Uri.OriginalString,
                    Status = true,
                    Type = (int)BanneType.homeBanner
                 };
                _banner.Add(banner);
            }
            catch (System.Exception ex)
            {
                return BadRequest();
            }
           
            return Ok(banner);
        }
        [HttpPost]
        [Route("course")]
        public IHttpActionResult Course()
        {
            var banner = new Banner();
            try
            {
                var file = System.Web.HttpContext.Current.Request;
                var fileResult = new BaseClass().UploadAsync(file.Files, "gallery", 200, 300);

                banner = new Banner()
                {
                    ImgUrl = fileResult.Uri.OriginalString,
                    Status = true,
                    Type = (int)BanneType.course
                };
                _banner.Add(banner);
            }
            catch (System.Exception ex)
            {
                return BadRequest();
            }

            return Ok(banner);

        }

     
        [HttpPost]
        [Route("faculty")]
        public IHttpActionResult Faculty()
        {
            var banner = new Banner();
            try
            {
                var file = System.Web.HttpContext.Current.Request;
                var fileResult = new BaseClass().UploadAsync(file.Files, "gallery", 200, 300);
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code =(int) HttpStatusCode.OK,
                    result = fileResult.Uri.OriginalString
                };
                return Ok(res);
            }
            catch (System.Exception ex)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.BadRequest.ToString(),
                    code = (int)HttpStatusCode.BadRequest,
                    result = ex.Message
                };
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("library")]
        public IHttpActionResult Library()
        {
            var banner = new Banner();
            try
            {
                var file = System.Web.HttpContext.Current.Request;
                var fileResult = new BaseClass().UploadAsync(file.Files, "gallery", 200, 300);

                banner = new Banner()
                {
                    ImgUrl = fileResult.Uri.OriginalString,
                    Status = true,
                    Type = (int)BanneType.library
                };
                _banner.Add(banner);
            }
            catch (System.Exception ex)
            {
                return BadRequest();
            }

            return Ok(banner);

        }

        [HttpPost]
        [Route("events")]
        public IHttpActionResult Events()
        {
            var banner = new Banner();
            try
            {
                var file = System.Web.HttpContext.Current.Request;
                var fileResult = new BaseClass().UploadAsync(file.Files, "gallery", 200, 300);

                banner = new Banner()
                {
                    ImgUrl = fileResult.Uri.OriginalString,
                    Status = true,
                    Type = (int)BanneType.events
                };
                _banner.Add(banner);
            }
            catch (System.Exception ex)
            {
                return BadRequest();
            }

            return Ok(banner);

        }
        [HttpPost]
   
        [Route("gallery")]
        public IHttpActionResult Gallery()
        {
            var banner = new Banner();
            try
            {
                var file = System.Web.HttpContext.Current.Request;
                var fileResult = new BaseClass().UploadAsync(file.Files, "gallery", 200, 300);

                banner = new Banner()
                {
                    ImgUrl = fileResult.Uri.OriginalString,
                    Status = true,
                    Type =(int) BanneType.gallery
                };
                _banner.Add(banner);
            }
            catch (System.Exception ex)
            {
                return BadRequest();
            }

            return Ok(banner);

        }

        [HttpPost]
        [Route("about")]
        public IHttpActionResult About()
        {
            var banner = new Banner();
            try
            {
                var file = System.Web.HttpContext.Current.Request;
                var fileResult = new BaseClass().UploadAsync(file.Files, "about", 200, 300);

                banner = new Banner()
                {
                    ImgUrl = fileResult.Uri.OriginalString,
                    Status = true,
                    Type = (int)BanneType.about
                };
                _banner.Add(banner);
            }
            catch (System.Exception ex)
            {
                return BadRequest();
            }

            return Ok(banner);

        }
    }

}
