using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.GigPackages;
using skillhub.Interfaces.IServiceLayer;
using skillhub.Interfaces.IRepositryLayer;

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
            bool result = false;

            // Create the appropriate package based on the PackageType
            switch (request.PackageType.ToLower())
            {
                case "basic":
                    // Use the injected service and pass necessary arguments
                    result = await _basic.AddGigPackage(request);
                    return Ok(new { message = "Freelancer Information saved successfully", data = result });

                    break;

                case "standard":
                    result = await _standard.AddGigPackage(request);
                    return Ok(new { message = "Freelancer Information saved successfully", data = result });
                    break;

                case "premium":
                    result = await _premium.AddGigPackage(request);
                    return Ok(new { message = "Freelancer Information saved successfully", data = result });
                    break;

                default:
                    return BadRequest("Invalid package type.");
            }

            return result ? Ok("Package added.") : StatusCode(500, "Failed to add package.");
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
    }

}
