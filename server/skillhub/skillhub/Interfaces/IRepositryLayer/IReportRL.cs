using System.Data;

namespace skillhub.Interfaces.IRepositryLayer
{
    public interface IReportRL
    {
        public Task<DataTable> OrderReport();
        public Task<DataTable> FreeLancerReport();
        public Task<DataTable> ClientsReport();
        public Task<DataTable> BlockedReport();
        public Task<DataTable> FreelancerExperinceReport(int year);
        public Task<DataTable> FreelacnerOrderReport(int orders);
        public Task<DataTable> CompletedOrderReport(DateOnly date);
        public Task<DataTable> PackageReport();
        public Task<DataTable> WalletReport();
        public Task<DataTable> OrderCoinReport(int coins);
        public Task<DataTable> GigReport();
    }
}
