using college.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace college.webapi.Models
{
    //public class AdmissionForm
    //{
    //    public AdmissionForm()
    //    {
    //        lstQualification = new List<AdmissionQualificationMapping>();
    //        formAdmission = new FormAdmission();
    //    }

    //    public FormAdmission formAdmission { get; set; }
    //    public List<AdmissionQualificationMapping> lstQualification{ get; set; }
    //}




    public class AdmissionForm
    {
        public AdmissionForm()
        {
            items = new List<Item>();
        }
        public string candidatename { get; set; }
        public string fathername { get; set; }
        public string mothername { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string state { get; set; }
        public int coursetype { get; set; }
        public string city { get; set; }
        public List<Item> items { get; set; }
    }

    public class Item
    {
        public string sclass { get; set; }
        public string yearofpassing { get; set; }
        public string subjects { get; set; }
        public string boards { get; set; }
    }


    public class StudentAdmissionFormResponse
    {
        public StudentAdmissionFormResponse()
        {
            qualificationList = new List<QualificationResp>();
        }
        public int id { get; set; }
        public string candidatename { get; set; }
        public string fathername { get; set; }
        public string mothername { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string state { get; set; }
        public int coursetype { get; set; }
        public string city { get; set; }
        public List<QualificationResp> qualificationList { get; set; }
        public int registrationNumber { get; set; }
        public string submittedStatus { get; set; }
    }

    public class QualificationResp
    {
        public string sclass { get; set; }
        public string yearofpassing { get; set; }
        public string subjects { get; set; }
        public string boards { get; set; }
    }

}