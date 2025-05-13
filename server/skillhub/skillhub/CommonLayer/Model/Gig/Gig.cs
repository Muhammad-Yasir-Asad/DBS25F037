using Microsoft.AspNetCore.Http;
using skillhub.CommonLayer.Model.GigPackages;
using System.Collections.Generic;

namespace skillhub.CommonLayer.Model.Gig
{
    public class Gig
    {
        public int gigId { get;private set; }
        public int userId { get; private set; }
        public string title { get; private set; }
        public string description { get; private set; }
        public int categoryId { get; private set; }
        public IFormFile gigPicture { get; set; }
        public IFormFile gigvideo { get; set; }
        public string imagepath { get; set; }
        public string videopath {  get; set; }
        public List<GigPackage> GigPackages { get; private set; }
        public float rating { get; private set; }
        public DateTime createdAt { get; private set; }
        public DateTime UpdatedDate { get; private set; }

        public Gig(
            int userId,
            string title,
            string description,
            int categoryId,
            IFormFile gigPicture,
            IFormFile gigVideo
            )
        {
            this.userId =       userId;
            this.title =        title;
            this.description =  description;
            this.categoryId =   categoryId;
            this.gigPicture =   gigPicture;
            this.gigvideo = gigVideo;
        }
        public Gig(
           int userId,
           string title,
           string description,
           int categoryId,
            string imagepath,string videopath
           )
        {
            this.userId = userId;
            this.title = title;
            this.description = description;
            this.categoryId = categoryId;
            this.imagepath = imagepath;
            this.videopath = videopath;
        }
        public Gig(int gigId, int userId, string title, string description, int categoryId, float rating, DateTime createdAt, DateTime updatedDate)
        {
            this.gigId = gigId;
            this.userId = userId;
            this.title = title;
            this.description = description;
            this.categoryId = categoryId;
            this.rating = rating;
            this.createdAt = createdAt;
            UpdatedDate = updatedDate;
        }
    }
}
