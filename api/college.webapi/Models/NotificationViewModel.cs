using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace college.webapi.Models
{
    public class NotificationViewModel
    {
        public string type { get; set; }
        public object notificationFor { get; set; }
        public object data { get; set; }
    }
}