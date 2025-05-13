using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.GigPackageSkills;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GigPackageSkillController : Controller
    {
        public readonly IGigPackageSkillSL gigPackageSkill;
        public GigPackageSkillController(IGigPackageSkillSL gigPackageSkill)
        {
            this.gigPackageSkill = gigPackageSkill;
        }
        [HttpPost("add_GigPackageSkill")]
        public async Task<IActionResult> AddGigPackageSkill(GigPackageSkillRequest gigPackageSkillRequest)
        {
            try
            {
                var result = await gigPackageSkill.AddGigPackageSkill(gigPackageSkillRequest);
                return Ok(new { message = "Gig Package Skill saved successfully", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> UpdateGigPackageSkill(GigPackageSkillRequest gigPackageSkillRequest)
        {
            try
            {
                var result = await gigPackageSkill.UpdateGigPackageSkill(gigPackageSkillRequest);
                return Ok(new { message = "Gig Package Skill updated successfully", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
