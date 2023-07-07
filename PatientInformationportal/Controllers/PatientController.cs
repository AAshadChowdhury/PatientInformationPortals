using Microsoft.AspNetCore.Mvc;

namespace PatientInformationportal.Controllers
{
    public class PatientController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Create()
        {
            return View();
        }
    }
}
