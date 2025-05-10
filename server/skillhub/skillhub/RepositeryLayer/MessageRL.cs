using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.CommonLayer.Model.Freelancer;
using skillhub.CommonLayer.Model.Messages;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using MySqlConnector;

namespace skillhub.RepositeryLayer
{
    public class MessageRL:IMessageRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;

        public MessageRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<bool> SendMessage(Message message)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.sendmessage;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@senderId", message.senderId);
                    sqlCommand.Parameters.AddWithValue("@receiverId", message.receiverId);
                    sqlCommand.Parameters.AddWithValue("@messageText", message.messageText);

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
