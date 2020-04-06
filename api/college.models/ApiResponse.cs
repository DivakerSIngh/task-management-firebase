using System;
using System.Collections.Generic;
using System.Text;

namespace college.models
{
    public class ApiResponse
    {
        public string status { get; set; }
        public int code { get; set; }
        public object result { get; set; }
        public int pages { get; set; }
        public object extra { get; set; }
    }
}
