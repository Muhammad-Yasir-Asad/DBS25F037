using System.Data;
using System.Reflection.Metadata.Ecma335;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class ReportSL : IReportSL
    {
        public readonly IReportRL reportInterface;
        public ReportSL(IReportRL reportInterface)
        {
            this.reportInterface = reportInterface;
        }

        public Task<DataTable> BlockedReport()
        {
            return reportInterface.BlockedReport();
        }

        public Task<DataTable> ClientsReport()
        {
            return reportInterface.ClientsReport();

        }

        public Task<DataTable> CompletedOrderReport(DateOnly date)
        {
            return reportInterface.CompletedOrderReport(date);

        }

        public Task<DataTable> FreelacnerOrderReport(int orders)
        {
            return reportInterface.FreelacnerOrderReport(orders);

        }

        public Task<DataTable> FreelancerExperinceReport(int year)
        {
            return reportInterface.FreelancerExperinceReport(year);
        }

        public Task<DataTable> FreeLancerReport()
        {
            return reportInterface.FreeLancerReport();
        }

        public Task<DataTable> GigReport()
        {
            return reportInterface.GigReport();
        }

        public Task<DataTable> OrderCoinReport(int coins)
        {
            return reportInterface.OrderCoinReport(coins);
        }

        public Task<DataTable> OrderReport()
        {
            return reportInterface.OrderReport();
        }

        public Task<DataTable> PackageReport()
        {
            return reportInterface.PackageReport();
        }

        public Task<DataTable> WalletReport()
        {
            return reportInterface.WalletReport();
        }
    }
}
