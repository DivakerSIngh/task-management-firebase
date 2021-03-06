﻿using college.@interface;
using college.models;
using college.webapi.Models;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace college.webapi.Controllers
{

        [RoutePrefix("api/task")]
        public class TaskDetailController : ApiController
        {
            private readonly IGeneric<TaskDetail> _genericRepository;
            public TaskDetailController(IGeneric<TaskDetail> genericRepository)
            {
                _genericRepository = genericRepository;
            }


            [HttpGet]
            [Route("getall")]
            public IHttpActionResult GetAll([System.Web.Http.FromUri] PagingModel pagingModel)
            {
            //   var UserId= Request.Headers.
           var result= Request.Headers.FirstOrDefault(x => x.Key == "UserId").Value.FirstOrDefault();
            if (result != null)
            {
                int userId = Convert.ToInt32(result);
                var lst = _genericRepository.Get(x => x.UserId == userId);

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
                        pages = count,
                        extra= lst.Sum(x=>x.Hours)
                    };
                    return Ok(res);
                }
                else
                {
                    return BadRequest();
                }
            }
            else {
                throw new System.Exception("Invalid user");
            }
              

            }


        [HttpGet]
        [Route("search")]
        public IHttpActionResult Search(string project,DateTime? fromdate,DateTime? todate,int pageNumber,int pageSize)
        
        {
            var lst = _genericRepository.Get(x => 
            (x.Project == project || project==null)
            && (x.Date>= fromdate || fromdate ==null)
            && (x.Date <= todate || todate==null)
            ).ToList();
           

            #region Paging
            int count = lst.Count();
            int CurrentPage = pageNumber + 1;
            int PageSize = pageSize;
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



        [HttpPost]
            [Route("delete")]
            public IHttpActionResult Delete([FromBody]TaskDetail TaskDetail)
            {
                try
                {
                    _genericRepository.Delete(TaskDetail);
                    var res = new ApiResponse()
                    {
                        status = HttpStatusCode.OK.ToString(),
                        code = (int)HttpStatusCode.OK,
                        result = null
                    };
                    return Ok(res);
                }
                catch (Exception ex)
                {
                    return BadRequest();
                }
            }


            [HttpPost]
            [Route("add")]
            public IHttpActionResult Save([FromBody]TaskDetail taskDetail)
            {
                try
                {
                taskDetail.CreatedDate = DateTime.Now;
                    _genericRepository.Add(taskDetail);


                //send push notification to admin
                var notificationHubContext = GlobalHost.ConnectionManager.GetHubContext<TaskHub>();
                if (notificationHubContext != null)
                {
                    var notificationViewModel = new NotificationViewModel() { 
                    data= taskDetail,
                    type="new task",
                    notificationFor="admin"
                    };
                    var data = JsonConvert.SerializeObject(notificationViewModel);
                    notificationHubContext.Clients.All.pushNewContent(data);
                }


                var res = new ApiResponse()
                    {
                        status = HttpStatusCode.OK.ToString(),
                        code = (int)HttpStatusCode.OK,
                        result = taskDetail
                    };
                    return Ok(res);
                }
                catch (Exception ex)
                {
                    return BadRequest();
                }


            }

            [HttpPost]
            [Route("update")]
            public IHttpActionResult Update([FromBody]TaskDetail taskDetail)
            {
                try
                {
                taskDetail.CreatedDate = DateTime.Now;
                _genericRepository.Update(taskDetail);

                    var res = new ApiResponse()
                    {
                        status = HttpStatusCode.OK.ToString(),
                        code = (int)HttpStatusCode.OK,
                        result = taskDetail
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
