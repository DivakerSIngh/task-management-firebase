using college.models;

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.Net;
using System.Net.Http;
using System.IO;
using System.Collections.Generic;
using System.Web;

namespace college.webapi.Controllers
{
    public class BaseClass
    {
        public ImageUploadResult UploadAsync(HttpFileCollection files, string directory, int height = 1300, int width = 200)
        {
            ImageUploadResult imageUploadResult = null;
            var httpRequest = System.Web.HttpContext.Current.Request;
            var cloudinary = new Cloudinary(
              new Account(
                "divaker",
                "681854243627474",
                "Pu8rfhmccAL2cy2ip-ZZHf1gpvE"));

            foreach (string file in httpRequest.Files)
            {
                var postedFile = httpRequest.Files[file];
                if (postedFile != null && postedFile.ContentLength > 0)
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(postedFile.FileName, postedFile.InputStream),
                        PublicId = "sample_id",
                        Transformation = new Transformation().Width(width).Height(height),
                        EagerTransforms = new List<Transformation>()
                      {
                        new Transformation().Width(width).Height(height).Crop("thumb").Gravity("face").
                          Radius(20).Effect("sepia"),
                        new Transformation().Width(width).Height(height).Crop("fit").FetchFormat("png")
                      },
                        Tags = "special, for_homepage"
                    };
                    imageUploadResult = cloudinary.UploadLarge(uploadParams);
                   
                }
            }
            return imageUploadResult;
        }
    }
}