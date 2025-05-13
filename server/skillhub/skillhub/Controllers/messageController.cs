using Azure;
using System;
using Microsoft.AspNetCore.Mvc;
using skillhub.Interfaces.IServiceLayer;
using skillhub.CommonLayer.Model.Messages;

namespace skillhub.Controllers
{
    
        [Route("api/[controller]")]
        [ApiController]
        public class MessagesController : Controller
        {
            private readonly IMessageSL messageInterface;

            public MessagesController(IMessageSL messageInterface)
            {
                this.messageInterface = messageInterface;
            }

            [HttpPost("send")]
            public async Task<IActionResult> SendMessage(MessageRequest request)
            {
                try
                {
                    var response = await messageInterface.SendMessage(request);

                    return Ok(new { message = "Message sent", data = response });
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        [HttpDelete("deleteMessage/{messageId}")]
        public async Task<IActionResult> DeleteMessage(int messageId)
        {
            try
            {
                var response = await messageInterface.DeleteMessage(messageId);

                return Ok(new { message = "Message sent", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



[HttpGet("Retrive_Msg_bySender")]
        public async Task<IActionResult> RetriveMessagebySender(int senderid)
        {
            try
            {
                var response = await messageInterface.RetriveMessagebySender(senderid);

                return Ok(new { message = "Message retrived", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Retrive_Msg_byReceiver")]
        public async Task<IActionResult> RetriveMessagebyReceiver(int Receiverid)
        {
            try
            {
                var response = await messageInterface.RetriveMessagebyReceiver(Receiverid);

                return Ok(new { message = "Message retrived", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
    

