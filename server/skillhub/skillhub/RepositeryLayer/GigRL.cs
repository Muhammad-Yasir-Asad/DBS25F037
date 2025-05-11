using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;

namespace skillhub.RepositeryLayer
{
    public class GigRL : IGigRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;

        public GigRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
        }
        public async Task<bool> AddFreelancerGig(Gig gig)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                    await mySqlConnection.OpenAsync();

                // Step 1: Insert Gig and get inserted ID
                string gigInsertQuery = SqlQueries.GigInformation;

                int gigId;
                using (MySqlCommand cmd = new MySqlCommand(gigInsertQuery, mySqlConnection))
                {
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandTimeout = 180;

                    cmd.Parameters.AddWithValue("@userId", gig.userId);
                    cmd.Parameters.AddWithValue("@title", gig.title);
                    cmd.Parameters.AddWithValue("@description", gig.description);
                    cmd.Parameters.AddWithValue("@categoryId", gig.categoryId);

                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding freelancer gig: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return false;
            }
        }


        public async Task<bool> DeleteGig(int gigId)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }
                string commandText = SqlQueries.GigDelete;
                using (MySqlCommand cmd = new MySqlCommand(commandText, mySqlConnection))
                {
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandTimeout = 180;
                    cmd.Parameters.AddWithValue("@gigId", gigId);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected > 0)
                    {
                        return true; // Gig deleted successfully
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception to a file, console, or logging framework
                Console.WriteLine($"Error deleting gig: {ex.Message}");
                // Optionally log stack trace too
                Console.WriteLine(ex.StackTrace);
                return false;
            }
        }

        public async Task<bool> UpdateGig(int gigId, Gig gig)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }
                string commandText = SqlQueries.GigUpdate;
                using (MySqlCommand cmd = new MySqlCommand(commandText, mySqlConnection))
                {
                    cmd.CommandType = System.Data.CommandType.Text;
                    cmd.CommandTimeout = 180;
                    cmd.Parameters.AddWithValue("@gigId", gigId);
                    cmd.Parameters.AddWithValue("@userId", gig.userId); // ✅ ADD THIS
                    cmd.Parameters.AddWithValue("@title", gig.title);
                    cmd.Parameters.AddWithValue("@description", gig.description);
                    cmd.Parameters.AddWithValue("@categoryId", gig.categoryId);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected > 0)
                    {
                        return true; // Gig updated successfully
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception to a file, console, or logging framework
                Console.WriteLine($"Error updating gig: {ex.Message}");
                // Optionally log stack trace too
                Console.WriteLine(ex.StackTrace);
                return false;
            }
        }
    }
