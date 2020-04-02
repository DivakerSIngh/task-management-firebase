using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using college.@interface;
using college.models;
using college.models;

namespace college.webapi.Controllers
{
    [RoutePrefix("api/faculty")]

    public class FacultyController : ApiController
    {
        private IGeneric<Faculty> _faculty;

        public FacultyController(IGeneric<Faculty> genericRepository)
        {
            _faculty = genericRepository;
        }
        [HttpGet]
        [Route("getall")]
        public IHttpActionResult GetAll([System.Web.Http.FromUri] PagingModel pagingModel)
        {
            var lst = _faculty.List();

            #region Paging
            int count = lst.Count();
            int CurrentPage = pagingModel.pageNumber+1;
            int PageSize = pagingModel.pageSize;
            int TotalCount = count;
            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

            // Returns List of Customer after applying Paging   
            var items = lst.OrderBy(x => x.Id).Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

            // if CurrentPage is greater than 1 means it has previousPage  
            var previousPage = CurrentPage > 1 ? "Yes" : "No";

            // if TotalPages is greater than CurrentPage means it has nextPage  
            var nextPage = CurrentPage < TotalPages ? "Yes" : "No";

            var paginationMetadata = new
            {
                totalCount = TotalCount,
                pageSize = PageSize,
                currentPage = CurrentPage,
                totalPages = TotalPages,
                previousPage,
                nextPage
            };
            #endregion


            if (items != null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                     code =(int) HttpStatusCode.OK,
                    result = items,
                    pages= count
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult Save([FromBody]Faculty faculty)
        {
            try
            {
                _faculty.Add(faculty);

                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                     code =(int) HttpStatusCode.OK,
                    result = null
                };
                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
          

        }

        [HttpPost]
        [Route("update")]
        public IHttpActionResult Update([FromBody]Faculty facility)
        {
            try
            {
                _faculty.Update(facility);

                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                     code =(int) HttpStatusCode.OK,
                    result = null
                };
                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest();
            }


        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult Delete([FromBody]Faculty facility)
        {
            try
            {
                _faculty.Delete(facility);
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                     code =(int) HttpStatusCode.OK,
                    result = null
                };
                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
