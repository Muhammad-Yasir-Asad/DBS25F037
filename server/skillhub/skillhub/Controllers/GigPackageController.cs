using Microsoft.AspNetCore.Mvc;
using skillhub.Interfaces.IServiceLayer;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.CommonLayer.Model.GigPackages;
using skillhub.CommonLayer.Model.Freelancer;

namespace skillhub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GigPackageController : Controller
    {
        private readonly IGigPackageBasicSL _basic;
        private readonly IGigPackageStandardSL _standard;
        private readonly IGigPackagePremiumSL _premium;

        // Constructor with dependency injection
        public GigPackageController(IGigPackageBasicSL basic, IGigPackageStandardSL standard, IGigPackagePremiumSL premium)
        {
            _basic = basic;
            _standard = standard;
            _premium = premium;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPackage(GigPackageRequest request)
        {
            int packageId = 0;

            switch (request.PackageType.ToLower())
            {
                case "basic":
                    packageId = await _basic.AddGigPackage(request);
                    break;
                case "standard":
                    packageId = await _standard.AddGigPackage(request);
                    break;
                case "premium":
                    packageId = await _premium.AddGigPackage(request);
                    break;
                default:
                    return BadRequest("Invalid package type.");
            }

            if (packageId > 0)
                return Ok(new { packageId, message = "Package added successfully." });
            else
                return StatusCode(500, "Failed to add package.");
        }

        [HttpPut("UpdateGigPackage")]
        public async Task<IActionResult> updatePackage(GigPackageRequest package, int packageId)
        {
            bool result = false;


            // Create the appropriate package based on the PackageType
            switch (package.PackageType.ToLower())
            {
                case "basic":
                    result = await _basic.UpdateGigPackage(package, packageId);
                    return Ok(new { message = "GigPackage Updated succesfully", data = result });
                    break;
                case "standard":
                    result = await _standard.UpdateGigPackage(package, packageId);
                    return Ok(new { message = "GigPackage Updated succesfully", data = result });
                    break;
                case "premium":
                    result = await _premium.UpdateGigPackage(package, packageId);
                    return Ok(new { message = "Freelancer Information saved successfully", data = result });
                    break;
                default:
                    return BadRequest("Invalid package type.");
            }

        }
        [HttpGet("GetGigPackage")]
        public async Task<IActionResult> getGigPackage(int id)
        {
            try
            {
                var result = await _basic.GetGigPackage(id);
                return Ok(new { message = "GigPackage retrived saved successfully", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}
