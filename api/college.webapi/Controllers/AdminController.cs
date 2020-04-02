using college.@interface;
using college.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace college.webapi.Controllers
{
    [RoutePrefix("api/admin")]
    public class AdminController : ApiController
    {
        private IGeneric<Enquiry> _enquiry;

        public AdminController(IGeneric<Enquiry> genericRepository)
        {
            _enquiry = genericRepository;
        }
        [HttpPost]
        [Route("postenquiry")]
        public IHttpActionResult Save([FromBody]Enquiry enquiry)
        {
            try
            {
                enquiry.CreatedDate = DateTime.Now;
                _enquiry.Add(enquiry);

                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = _enquiry.List()
                };
                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getallenquiry")]
        public IHttpActionResult Getallenquiry([System.Web.Http.FromUri] PagingModel pagingModel)
        {
            var lst = _enquiry.List();

            #region Paging
            int count = lst.Count();
            int CurrentPage = pagingModel.pageNumber + 1;
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
                    code = (int)HttpStatusCode.OK,
                    result = items,
                    pages = count
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
