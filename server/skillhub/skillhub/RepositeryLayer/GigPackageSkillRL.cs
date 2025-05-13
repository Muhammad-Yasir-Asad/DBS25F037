using Microsoft.Extensions.Logging;
using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.CommonLayer.Model.GigPackageSkills;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;


namespace skillhub.RepositeryLayer
{
    public class GigPackageSkillRL : IGigPackageSkillRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;
        private readonly ILogger<GigPackageSkillRL> _logger;

        public GigPackageSkillRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory, ILogger<GigPackageSkillRL> logger)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
            _logger = logger;
        }



        public async Task<bool> AddGigPackageSkill(GigPackageSkill packageSkill)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.GigPackageSkillInformation;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@packageSkillId", packageSkill.packageSkillId);
                    sqlCommand.Parameters.AddWithValue("@packageId", packageSkill.packageId);
                    sqlCommand.Parameters.AddWithValue("@skillId", packageSkill.skillId);

                    await sqlCommand.ExecuteNonQueryAsync();

                    return true;

                }


            }
            catch (MySqlException sqlEx)
            {
                _logger.LogError(sqlEx, "MySQL error occurred while adding gig package skill.");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred in AddGigPackageSkill.");
                throw;
            }
        }
        public async Task<bool> UpdateGigPackageSkill(GigPackageSkill packageSkill)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }
                string commandText = SqlQueries.GigPackageSkillUpdate;
                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@packageSkillId", packageSkill.packageSkillId);
                    sqlCommand.Parameters.AddWithValue("@packageId", packageSkill.packageId);
                    sqlCommand.Parameters.AddWithValue("@skillId", packageSkill.skillId);
                    await sqlCommand.ExecuteNonQueryAsync();
                    return true;
                }
            }
            catch (MySqlException sqlEx)
            {
                _logger.LogError(sqlEx, "MySQL error occurred while updating gig package skill.");
                throw;
            }

        }

    }
}

