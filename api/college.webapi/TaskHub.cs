﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace college.webapi
{
    [HubName("notificationHub")]
    public class TaskHub : Hub
    {
        public void PushNewContent(string data)
        {
            Clients.All.pushNewContent(data);
        }
    }
}