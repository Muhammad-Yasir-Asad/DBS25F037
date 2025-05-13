using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.CommonLayer.Model.Blocked;
using skillhub.CommonLayer.Model.Freelancer;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.ServiceLayer;

namespace skillhub.RepositeryLayer
{
    public class BlockedRL : IBlockedRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;

        public BlockedRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
        }
        public async Task<bool> BlockUser(Blocked blocked)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.blockUser;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@blockerId", blocked.blocker.userID);
                    sqlCommand.Parameters.AddWithValue("@blockedUserId", blocked.blockedUser.userID);
                    sqlCommand.Parameters.AddWithValue("@reason", blocked.reason);

                    await sqlCommand.ExecuteNonQueryAsync();

                    return true;

                }

            }
            catch (Exception ex)
            {
                return false;
            }


        }

        public async Task<bool> unBlockUser(int blockerid, int blockeduserid)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.unblockUser;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@blockerid", blockerid);
                    sqlCommand.Parameters.AddWithValue("@blockeduserId", blockeduserid);

                    await sqlCommand.ExecuteNonQueryAsync();

                    return true;

                }

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
