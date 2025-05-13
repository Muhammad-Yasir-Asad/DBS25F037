using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.Freelancer;
using skillhub.CommonLayer.Model.Users;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class freelancerController : Controller
    {
        public readonly IFreelancerSL freelancer;

        public freelancerController(IFreelancerSL freelancer)
        {
            this.freelancer = freelancer;         
        }


        [HttpPost("add_Freelancer_information")]
        
        public async Task<IActionResult> AddFreelancerInformation(FreelancerRequest freelancerRequest)
        {
            try
            {
                var result = await freelancer.AddFreelancerInformation(freelancerRequest);
                return Ok(new { message = "Freelancer Information saved successfully", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Find_freelancer")]
        public async Task<IActionResult> FindFreelancers(int freelancerid)
        {
            try
            {
                var result = await freelancer.findFreelancer(freelancerid);
                return Ok(new { message = "Freelancer retrived saved successfully", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
