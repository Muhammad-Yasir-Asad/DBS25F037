using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.CommonLayer.Model.GigPackages;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;

namespace skillhub.RepositeryLayer
{
    public class GigPackageRL : IGigPackageRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;
        private readonly ILogger<GigPackageRL> _logger;
        public GigPackageRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory, ILogger<GigPackageRL> logger)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
            _logger = logger;
        }
        public async Task<int> AddGigPackage(GigPackage gigPackage, string packageType)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }
                string commandText = SqlQueries.GigPackageInformation;
                await using (MySqlCommand cmd = new MySqlCommand(commandText, mySqlConnection))
                {

                    cmd.Parameters.AddWithValue("@gigId", gigPackage.GigId);
                    cmd.Parameters.AddWithValue("@price", gigPackage.Price);
                    cmd.Parameters.AddWithValue("@packageType", packageType);
                    cmd.Parameters.AddWithValue("@deliveryDays", gigPackage.DeliveryDays);
                    cmd.Parameters.AddWithValue("@description", gigPackage.Description);

                    var packageId = await cmd.ExecuteScalarAsync();
                    return Convert.ToInt32(packageId);

                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding gig package for GigId: {GigId}", gigPackage.GigId);
                return 0;
            }
            

        }
        public async Task<bool> UpdateGigPackage(GigPackage gigPackage, int id, string packageType)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.GigPackageUpdate;

                using (MySqlCommand cmd = new MySqlCommand(commandText, mySqlConnection))
                {
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandTimeout = 180;

                    cmd.Parameters.AddWithValue("@gigId", id);
                    cmd.Parameters.AddWithValue("@packageType", packageType);
                    cmd.Parameters.AddWithValue("@price", gigPackage.Price);
                    cmd.Parameters.AddWithValue("@deliveryDays", gigPackage.DeliveryDays);
                    cmd.Parameters.AddWithValue("@description", gigPackage.Description);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating gig package: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return false;
            }
        }

    }
    
}
