using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;
using skillhub.CommonLayer.Model.Gig;
using skillhub.CommonLayer.Model.GigPackages;
using skillhub.CommonLayer.Model.Users;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace skillhub.ServiceLayer
{
    public class GigSL : IGigSL
    {
        private readonly IGigRL Gig;
        private readonly IWebHostEnvironment environment;

        // Corrected constructor to inject both dependencies
        public GigSL(IGigRL gig, IWebHostEnvironment environment)
        {
            this.Gig = gig;
            this.environment = environment;
        }

        public async Task<int> AddFreelancerGig(GigRequest gigRequest)
        {
            // Validate required fields
            if (gigRequest == null ||
                string.IsNullOrWhiteSpace(gigRequest.title) ||
                string.IsNullOrWhiteSpace(gigRequest.description) ||
                gigRequest.categoryId <= 0 ||
                gigRequest.gigPicture == null ||
                gigRequest.gigvideo == null)
            {
                return -1;
            }

            string webRootPath = environment.WebRootPath;

            if (string.IsNullOrEmpty(webRootPath))
            {
                throw new InvalidOperationException("WebRootPath is not set.");
            }

            Console.WriteLine($"WebRootPath: {webRootPath}");

            // -------- Save Image --------
            string imageFileName = Guid.NewGuid().ToString() + Path.GetExtension(gigRequest.gigPicture.FileName);
            string imagePath = Path.Combine("Images", imageFileName);
            string fullImagePath = Path.Combine(webRootPath, imagePath);
            Directory.CreateDirectory(Path.GetDirectoryName(fullImagePath)!);
            using (var imageStream = new FileStream(fullImagePath, FileMode.Create))
            {
                await gigRequest.gigPicture.CopyToAsync(imageStream);
            }

            // -------- Save Video --------
            string videoFileName = Guid.NewGuid().ToString() + Path.GetExtension(gigRequest.gigvideo.FileName);
            string videoPath = Path.Combine("Videos", videoFileName);
            string fullVideoPath = Path.Combine(webRootPath, videoPath);
            Directory.CreateDirectory(Path.GetDirectoryName(fullVideoPath)!);
            using (var videoStream = new FileStream(fullVideoPath, FileMode.Create))
            {
                await gigRequest.gigvideo.CopyToAsync(videoStream);
            }

            // -------- Create Gig Object --------
            Gig gig = new Gig(
                gigRequest.userId,
                gigRequest.title,
                gigRequest.description,
                gigRequest.categoryId,
                imagePath,    // Saved relative image path
                videoPath     // Saved relative video path
            );

            // -------- Save to DB --------
            return await Gig.AddFreelancerGig(gig);
        }


        public Task<bool> DeleteGig(int id)
        {
            return Gig.DeleteGig(id);
        }

        public Task<bool> UpdateGig(int id, GigRequest gigRequest)
        {
            // Create Gig object from gigRequest
            Gig gig = new Gig(gigRequest.userId, gigRequest.title, gigRequest.description, gigRequest.categoryId, gigRequest.gigPicture,gigRequest.gigvideo);
            return Gig.UpdateGig(id, gig);
        }
        public Task<Gig> GetGig(int id)
        {
            return Gig.GetGig(id);
        }
    }
}
