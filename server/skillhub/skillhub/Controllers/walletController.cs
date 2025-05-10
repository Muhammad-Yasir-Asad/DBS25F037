using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.Messages;
using skillhub.CommonLayer.Model.Users;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.Controllers
{
   

        [Route("api/[controller]")]
        [ApiController]
        public class walletController : Controller
        {
            private readonly IWalletSL walletInterface;

        public walletController(IWalletSL walletInterface)
        {
            this.walletInterface = walletInterface;
        }

        [HttpPost("create")]
        public async Task<IActionResult> MakeWallet(WalletRequest request)
        {
            try
            {
                var response = await walletInterface.MakeWallet(request);

                return Ok(new { message = "Wallet made successfully", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

