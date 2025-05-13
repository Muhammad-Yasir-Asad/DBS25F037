using Microsoft.AspNetCore.Mvc;
using skillhub.CommonLayer.Model.Order;
using skillhub.Interfaces.IServiceLayer;
using skillhub.Common_Utility;
using System.Data;
namespace skillhub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class reportController : Controller
    {
        public readonly IReportSL reportInterface;
        public reportController(IReportSL reportInterface)
        {
            this.reportInterface = reportInterface;
        }
        [HttpGet("Blocked_Report")]
        public async Task<IActionResult> BlockReport()
        {
            try
            {
                var response = await reportInterface.BlockedReport();

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Blocked Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "BlockedReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from BlockedReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("ClientsReport")]
        public async Task<IActionResult> ClientsReport()
        {
            try
            {
                var response = await reportInterface.ClientsReport();

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Client Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "ClientsReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from BlockedReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("CompletedOrderReport")]
        public async Task<IActionResult> CompletedOrderReport(DateOnly date)
        {
            try
            {
                var response = await reportInterface.CompletedOrderReport(date);

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Completed Orders by date Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "CompletedOrderReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from CompletedOrderReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("FreelacnerOrderReport")]
        public async Task<IActionResult> FreelacnerOrderReport(int orders)
        {
            try
            {
                var response = await reportInterface.FreelacnerOrderReport(orders);

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Freelancer's Minimum orders Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "FreelacnerOrderReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from FreelacnerOrderReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("FreelancerExperinceReport")]
        public async Task<IActionResult> FreelancerExperinceReport(int years)
        {
            try
            {
                var response = await reportInterface.FreelancerExperinceReport(years);

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Freelancer's Minimum Experiece years Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "FreelancerExperinceReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from FreelancerExperinceReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("FreeLancerReport")]
        public async Task<IActionResult> FreeLancerReport()
        {
            try
            {
                var response = await reportInterface.FreeLancerReport();

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Freelancer Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "FreeLancerReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from FreeLancerReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GigReport")]
        public async Task<IActionResult> GigReport()
        {
            try
            {
                var response = await reportInterface.GigReport();

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Gig Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "GigReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from GigReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("OrderCoinReport")]
        public async Task<IActionResult> OrderCoinReport(int coins)
        {
            try
            {
                var response = await reportInterface.OrderCoinReport(coins);

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Order by minimum coins Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "OrderCoinReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from OrderCoinReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("OrderReport")]
        public async Task<IActionResult> OrderReport()
        {
            try
            {
                var response = await reportInterface.OrderReport();

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Order  Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "OrderReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from OrderReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("PackageReport")]
        public async Task<IActionResult> PackageReport()
        {
            try
            {
                var response = await reportInterface.PackageReport();

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Package  Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "PackageReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from PackageReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("WalletReport")]
        public async Task<IActionResult> WalletReport()
        {
            try
            {
                var response = await reportInterface.WalletReport();

                if (response is DataTable dataTable)
                {
                    // Generate the PDF
                    string pdfFilePath = Common_Utility.PdfReportGenerator.GeneratePdfReport(dataTable, "Wallet  Report");

                    // Read the file and return it as a file download
                    byte[] pdfBytes = System.IO.File.ReadAllBytes(pdfFilePath);
                    return File(pdfBytes, "application/pdf", "WalletReport.pdf");
                }
                else
                {
                    return BadRequest("Invalid data format received from WalletReport.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}
