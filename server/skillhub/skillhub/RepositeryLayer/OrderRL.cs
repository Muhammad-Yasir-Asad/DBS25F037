using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.CommonLayer.Model.Freelancer;
using skillhub.CommonLayer.Model.Gig;
using skillhub.CommonLayer.Model.GigPackages;
using skillhub.CommonLayer.Model.Order;
using skillhub.CommonLayer.Model.Users;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;
using skillhub.ServiceLayer;

namespace skillhub.RepositeryLayer
{
    public class OrderRL : IOrderRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;
        public readonly UserInterfaceSL userInterface;
        public readonly IFreelancerSL freelancerInterface;
        public readonly IGigSL gigInterface;
        public readonly IGigPackageRL gigPackageSL;

        public OrderRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory, UserInterfaceSL userInterface, IFreelancerSL freelancerInterface, IGigSL gigInterface, IGigPackageRL gigPackageSL)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
            this.userInterface = userInterface;
            this.freelancerInterface = freelancerInterface;
            this.gigInterface = gigInterface;
            this.gigPackageSL = gigPackageSL;
        }

        public async Task<bool> deleteOrder(int orderId)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.deleteOrder;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@orderId", orderId);
                    await sqlCommand.ExecuteNonQueryAsync();

                    return true;

                }
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public async Task<Order> findOrder(int orderId)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.findOrder;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@orderId", orderId);

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            int clientId = (int)reader["clientId"];
                            int gigId = (int)reader["gigId"];
                            int gigpackageId = (int)reader["packageId"];
                            int freelancerID = (int)reader["freelancerID"];
                            DateTime orderDate = (DateTime)reader["orderDate"];
                            DateTime dueDate = (DateTime)reader["dueDate"];
                            string status = (string)reader["status"];
                            int coinAmount = (int)reader["coinAmount"];
                            DateTime? completionDate = reader["completionDate"] == DBNull.Value 
    ? (DateTime?)null 
    : (DateTime)reader["completionDate"];

                            User client = await userInterface.findUser(clientId);
                            Freelancer freelancer = await freelancerInterface.findFreelancer(freelancerID);
                            Gig gig = await gigInterface.GetGig(gigId);
                            GigPackage gigPackage = await gigPackageSL.GetGigPackage(gigpackageId);
                            return new Order(orderId, client, gig,gigPackage, freelancer, orderDate, dueDate, status, coinAmount, completionDate);

                        }
                        else
                        {
                            Console.WriteLine("IF check");
                            return null;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex}");

                return null;
            }
        }

        public async Task<bool> MakeOrder(Order order)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();
            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.insertOrder;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@clientId", order.client.userID);
                    sqlCommand.Parameters.AddWithValue("@gigID", order.gig.gigId);
                    sqlCommand.Parameters.AddWithValue("@freelancerId", order.freelancer.freelancerID);
                    sqlCommand.Parameters.AddWithValue("@dueDate", order.dueDate);
                    sqlCommand.Parameters.AddWithValue("@coinAmount", order.coinAmount);
                    sqlCommand.Parameters.AddWithValue("@gigpackageId", order.gigPackage.gigpackageId);
                    await sqlCommand.ExecuteNonQueryAsync();

                    return true;

                }
            }
            catch (Exception)
            {
                return false;
            }

        }

        public async Task<bool> updateOrder(int orderId, string status)
        {

            {
                await using var mySqlConnection = dbConnectionFactory.CreateConnection();
                try
                {
                    if (mySqlConnection.State != System.Data.ConnectionState.Open)
                    {
                        await mySqlConnection.OpenAsync();
                    }

                    string commandText = SqlQueries.updateOrder;

                    using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                    {
                        sqlCommand.CommandType = System.Data.CommandType.Text;
                        sqlCommand.CommandTimeout = 180;

                        sqlCommand.Parameters.AddWithValue("@orderId", orderId);
                        sqlCommand.Parameters.AddWithValue("@status", status);
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
}
