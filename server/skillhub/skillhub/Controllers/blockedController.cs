using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.Blocked;
using skillhub.CommonLayer.Model.Freelancer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class blockedController : Controller
    {
        public readonly IBlockedSL blockedinterface;

        public blockedController(IBlockedSL blockedinterface)
        {
            this.blockedinterface = blockedinterface;
        }


        [HttpPost("block_user")]

        public async Task<IActionResult> BlockUser(BlockedRequest Request)
        {
            try
            {
                var result = await blockedinterface.BlockUser(Request);
                return Ok(new { message = "User blocked successfully", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("Unblock_user")]
        public async Task<IActionResult> unBlockUser(int blockerid, int blockedid)
        {
            try
            {
                var result = await blockedinterface.unBlockUser(blockerid, blockedid);
                return Ok(new { message = "User unblocked successfully", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
