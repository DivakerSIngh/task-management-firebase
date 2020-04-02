
using AutoMapper;
using college.@interface;
using college.models;
using college.webapi.Models;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace college.webapi.Controllers
{
    [RoutePrefix("api/admission")]
    public class AdmissionFormController : ApiController
    {
        private readonly IGeneric<StudentAdmissionForm> _admissionForm;
        private readonly IGeneric<StudentQualificationMapping> _studentMapping;

        public AdmissionFormController(IGeneric<StudentAdmissionForm> genericRepositoryForm, IGeneric<StudentQualificationMapping> genericRepositoryMapping)
        {
            _admissionForm = genericRepositoryForm;
            _studentMapping = genericRepositoryMapping;
        }
        [HttpPost]
        [Route("postform")]
        public IHttpActionResult Form([FromBody] AdmissionForm admissionForm)
        {
            var res = new ApiResponse();
            try
            {
                Random r = new Random();
                int num = r.Next();
                var student = new StudentAdmissionForm()
                {
                    Address = admissionForm.address,
                    CandidateName = admissionForm.candidatename,
                    City = admissionForm.city,
                    Email = admissionForm.email,
                    FatherName = admissionForm.fathername,
                    Mobile = admissionForm.mobile,
                    MotherName = admissionForm.mothername,
                    State = admissionForm.state,
                    CourseType=admissionForm.coursetype,
                    RegistrationNumber= num
                };
                var response = _admissionForm.Add(student);


                var lstmap = admissionForm.items.ConvertAll(x => new StudentQualificationMapping
                {
                    Boards = x.boards,
                    Class = x.sclass,
                    StudentAdmissionID = response.Id,
                    Subjects = x.subjects,
                    YearOfPassing = x.yearofpassing,
                }).ToList();
                var returrep = _studentMapping.BulkAdd(lstmap);

                res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = lstmap
                };
            }
            catch (Exception ex)
            {

                throw;
            }


            return Ok(res);

        }

        [HttpGet]
        [Route("getbyid")]
        public IHttpActionResult get(int id)
        {
            //var lst = _admissionForm.List();
            var dom = new StudentAdmissionFormResponse();
            var x = _admissionForm.GetById(id);
            dom = new StudentAdmissionFormResponse()
            {

                registrationNumber = x.RegistrationNumber,
                submittedStatus = string.IsNullOrEmpty(x.SubmittedStatus) ? "" : "Submitted",
                id = x.Id,
                address = x.Address,
                candidatename = x.CandidateName,
                city = x.City,
                coursetype = x.CourseType,
                email = x.Email,
                fathername = x.FatherName,
                qualificationList = _studentMapping.Get(d=>d.StudentAdmissionID== id).ToList().ConvertAll(xy => new QualificationResp
                {
                    boards = xy.Boards,
                    sclass = xy.Class,
                    subjects = xy.Subjects,
                    yearofpassing = xy.YearOfPassing,
                }).ToList(),
                mobile = x.Mobile,
                mothername = x.MotherName,
                state = x.State

            };

            if (dom != null)
            {
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = dom,
                    pages = 0
                };
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }

        }



        [HttpGet]
        [Route("getall")]
        public IHttpActionResult GetAll([System.Web.Http.FromUri] PagingModel pagingModel)
        {
            //var lst = _admissionForm.List();
            var lst = _admissionForm.List().ToList().ConvertAll(x => new StudentAdmissionFormResponse
            {
                registrationNumber=x.RegistrationNumber,
                submittedStatus=string.IsNullOrEmpty(x.SubmittedStatus)?"":"Submitted",
                id=x.Id,
                address = x.Address,
                candidatename = x.CandidateName,
                city = x.City,
                coursetype = x.CourseType,
                email = x.Email,
                fathername = x.FatherName,
                qualificationList = _studentMapping.List().Where(y => y.StudentAdmissionID == x.Id).ToList().ConvertAll(xy => new QualificationResp
                {
                    boards = xy.Boards,
                    sclass = xy.Boards,
                    subjects = xy.Subjects,
                    yearofpassing = xy.YearOfPassing,
                }).ToList(),
                mobile=x.Mobile,
                mothername=x.MotherName,
                state=x.State

            }).ToList();



            #region Paging
            int count = lst.Count();
            int CurrentPage = pagingModel.pageNumber + 1;
            int PageSize = pagingModel.pageSize;
            int TotalCount = count;
            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

            // Returns List of Customer after applying Paging   
            var items = lst.OrderBy(x => x.id).Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

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


        [HttpGet]
        [Route("submit")]
        public IHttpActionResult FormSubmit(int id)
        {
            try
            {
               var obj=   _admissionForm.GetById(id);
                obj.SubmittedStatus = "Submitted";
                _admissionForm.Update(obj);
                var res = new ApiResponse()
                {
                    status = HttpStatusCode.OK.ToString(),
                    code = (int)HttpStatusCode.OK,
                    result = obj,
                    pages = 0
                };
                return Ok(res);

            }
            catch (Exception ex)
            {
                return Ok();
                throw;
            }
           

        }


        
    }
}




