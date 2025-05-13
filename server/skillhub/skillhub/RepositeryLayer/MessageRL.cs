using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.CommonLayer.Model.Freelancer;
using skillhub.CommonLayer.Model.Messages;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using MySqlConnector;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.RepositeryLayer
{
    public class MessageRL:IMessageRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;
        public readonly UserInterfaceSL userInterface;

        public MessageRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory, UserInterfaceSL userInterface)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
            this.userInterface = userInterface;
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
        public async Task<bool> DeleteMessage(int messageid)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.deleteMessage;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@messageId", messageid);

                    await sqlCommand.ExecuteNonQueryAsync();

                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<Message>> RetriveMessagebyReceiver(int receiverid)
        {

            {
                await using var mySqlConnection = dbConnectionFactory.CreateConnection();

                try
                {
                    if (mySqlConnection.State != System.Data.ConnectionState.Open)
                    {
                        await mySqlConnection.OpenAsync();
                    }

                    string commandText = SqlQueries.retrivemessagebyreceiver;

                    using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                    {
                        sqlCommand.CommandType = System.Data.CommandType.Text;
                        sqlCommand.CommandTimeout = 180;

                        sqlCommand.Parameters.AddWithValue("@receiverId", receiverid);

                        using (var reader = await sqlCommand.ExecuteReaderAsync())
                        {
                            List<Message> messages = new List<Message>();
                            while (reader.Read())
                            {
                                int messageid = (int)reader["messageId"];
                                int msgsenderid = (int)reader["senderId"];
                                int msgreceiverid = (int)reader["receiverId"];
                                string messageText = (string)reader["MessageText"];
                                DateTime sentTime = (DateTime)reader["SentTime"];
                                bool isRead = (bool)reader["IsRead"];
                                messages.Add(new Message(messageid, msgsenderid, msgreceiverid, messageText, sentTime, isRead));

                            }
                            return messages;
                        }
                    }
                }




                catch (Exception)
                {
                    return null;
                }
            }
        }

        public async Task<List<Message>> RetriveMessagebySender(int senderid)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.retrivemessagebysender;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@senderId", senderid);

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        List<Message> messages = new List<Message>();
                        while (reader.Read())
                        {
                            int messageid = (int)reader["messageId"];
                            int msgsenderid = (int)reader["senderId"];
                            int msgreceiverid = (int)reader["receiverId"];
                            string messageText = (string)reader["MessageText"];
                            DateTime sentTime = (DateTime)reader["SentTime"];
                            bool isRead = (bool)reader["IsRead"];
                            messages.Add(new Message(messageid, msgsenderid, msgreceiverid, messageText, sentTime, isRead));
                        }
                        return messages;
                    }
                }
            }
            catch (Exception)
            {
                return null;

            }
        }

    }
}
