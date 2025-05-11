using Microsoft.AspNetCore.Mvc;

namespace skillhub.Controllers
{
    public class GigController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
