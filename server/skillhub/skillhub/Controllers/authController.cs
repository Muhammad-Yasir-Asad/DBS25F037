using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.Users;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class authController : ControllerBase
    {
        public readonly UserInterfaceSL userInterface;

        public authController(UserInterfaceSL userInterface)
        {
            this.userInterface = userInterface;
        }

        [HttpPost("register")]
        public async Task<IActionResult> AddUserRegister(RegisterRequest request)
        {
            UserRegisterResponse response = new UserRegisterResponse();

            try
            {
                response = await userInterface.AddUserRegister(request);
                if (!response.isSuccess)
                {

                    return BadRequest(new { message = response.message });
                }

                return Ok(new { message = "User registered successfully", data = response });
            }
            catch (Exception ex)
            {

                response.isSuccess = false;
                response.message = ex.Message;
                return BadRequest(new { isSuccess = response.isSuccess, message = $"Error: {ex.Message}" });

            }
            return Ok(new { isSuccess = response.isSuccess, messaage = response.message });
        }

        [HttpPost("login")]
        public async Task<IActionResult> ActionResult(UserLogin userLogin)
        {
            try
            {
                string token = await userInterface.AuthenticateUser(userLogin);
                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized(new { message = "Invalid credentials" });
                }
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("check-email")]
        public async Task<IActionResult> CheckEmail(checkEmail checkEmail)
        {
            try
            {
                bool exists = await userInterface.CheckEmailExists(checkEmail.email);
                return Ok(new { exists });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("check-username")]
        public async Task<IActionResult> CheckUserName(checkUserName checkUserName)
        {
            try
            {
                bool exists = await userInterface.CheckUserNameExists(checkUserName.userName);
                return Ok(new { exists });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("personal-information")]
        public async Task<IActionResult> AddPersonalInformation([FromForm] PersonalInformationRequest personalInformationRequest)
        {
            try
            {
                var result = await userInterface.AddPersonalInformation(personalInformationRequest);
                return Ok(new { message = "Information saved successfully", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }




    }
}