using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.CommonLayer.Model.Gig;
using Microsoft.AspNetCore.Connections;
using skillhub.CommonLayer.Model.GigPackages;
using System.Data;

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
        public async Task<int> AddFreelancerGig(Gig gig)
        {
            await using var connection = dbConnectionFactory.CreateConnection();
            if (connection.State != System.Data.ConnectionState.Open)
            {
                await connection.OpenAsync();
            }

            using var command = connection.CreateCommand();
            command.CommandText = "AddGig";  // Stored procedure name
            command.CommandType = CommandType.StoredProcedure;

            // Input parameters
            command.Parameters.Add(new MySqlParameter("p_userId", gig.userId));
            command.Parameters.Add(new MySqlParameter("p_title", gig.title));
            command.Parameters.Add(new MySqlParameter("p_description", gig.description ?? string.Empty));
            command.Parameters.Add(new MySqlParameter("p_categoryId", gig.categoryId));
            command.Parameters.Add(new MySqlParameter("p_picture", gig.imagepath ?? string.Empty));
            command.Parameters.Add(new MySqlParameter("p_video", gig.videopath ?? string.Empty));

            // Output parameter for GigId
            var outputParam = new MySqlParameter("p_gigId", MySqlDbType.Int32)
            {
                Direction = ParameterDirection.Output
            };
            command.Parameters.Add(outputParam);

            await command.ExecuteNonQueryAsync();

            return Convert.ToInt32(outputParam.Value); // Return newly inserted GigId
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
                Console.WriteLine($"Error deleting gig: {ex.Message}");
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
                    cmd.Parameters.AddWithValue("@userId", gig.userId); 
                    cmd.Parameters.AddWithValue("@title", gig.title);
                    cmd.Parameters.AddWithValue("@description", gig.description);
                    cmd.Parameters.AddWithValue("@categoryId", gig.categoryId);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected > 0)
                    {
                        return true; 
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                
                Console.WriteLine($"Error updating gig: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return false;
            }
        }

        public async Task<Gig> GetGig(int id)
        {

            {

                await using var mySqlConnection = dbConnectionFactory.CreateConnection();

                try
                {
                    if (mySqlConnection.State != System.Data.ConnectionState.Open)
                    {
                        await mySqlConnection.OpenAsync();
                    }

                    string commandText = SqlQueries.findGig;

                    using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                    {
                        sqlCommand.CommandType = System.Data.CommandType.Text;
                        sqlCommand.CommandTimeout = 180;

                        sqlCommand.Parameters.AddWithValue("@gigId", id);
                        using (var reader = await sqlCommand.ExecuteReaderAsync())
                        {
                            if (reader.Read())
                            {
                                int GigId = (int)reader["GigId"];
                                int userId = (int)reader["userId"];
                                string title = (string)reader["title"];
                                string Description = (string)reader["Description"];
                                DateTime CreatedDate = (DateTime)reader["CreatedDate"];
                                DateTime UpdatedDate = (DateTime)reader["UpdatedDate"];
                                int categoryId = (int)reader["categoryId"];
                                float AvgRating = (float)reader["AvgRating"];

                                return new Gig(GigId, userId, title, Description, categoryId, AvgRating, CreatedDate, UpdatedDate);
                            }
                            else
                                return null;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return null;
                }

            }
        }

    }
}
