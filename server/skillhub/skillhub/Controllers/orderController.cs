using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.Order;
using skillhub.CommonLayer.Model.Users;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class orderController : Controller
    {
        private readonly IOrderSL orderInterface;

        public orderController(IOrderSL orderInterface)
        {
            this.orderInterface = orderInterface;
        }
        [HttpPost("Place_Order")]
        public async Task<IActionResult> PalceOrder(OrderRequest request)
        {
            try
            {
                var response = await orderInterface.MakeOrder(request);

                return Ok(new { message = "Order made successfully", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Find_Order")]
        public async Task<IActionResult> FindOrder(int orderId)
        {
            try
            {
                var response = await orderInterface.findOrder(orderId);

                return Ok(new { message = "Order fetched successfully", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("Delete_Order/{orderid}")]
        public async Task<IActionResult> DeleteOrder(int orderid)
        {
            try
            {
                var response = await orderInterface.deleteOrder(orderid);

                return Ok(new { message = "Order fetched successfully", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update_Order")]
        public async Task<IActionResult> UpdateOrder(int orderId, string status)
        {
            try
            {
                var response = await orderInterface.updateOrder(orderId, status);

                return Ok(new { message = "Order fetched successfully", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
