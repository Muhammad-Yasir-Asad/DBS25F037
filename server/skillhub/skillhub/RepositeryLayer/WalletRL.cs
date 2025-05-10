using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.CommonLayer.Model.Messages;
using skillhub.CommonLayer.Model.Users;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;

namespace skillhub.RepositeryLayer
{
    public class WalletRL : IWalletRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;

        public WalletRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<bool> MakeWallet(Wallet wallet)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.makeWallet;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@userID", wallet.userID);
                    sqlCommand.Parameters.AddWithValue("@coinbalance", wallet.coinbalance);
                    sqlCommand.Parameters.AddWithValue("@Status", wallet.status);

                    await sqlCommand.ExecuteNonQueryAsync();

                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    } 
    }
