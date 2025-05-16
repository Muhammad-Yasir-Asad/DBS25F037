using System.Data.Common;
using Azure;
using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.CommonLayer.Model.Freelancer;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.RepositeryLayer
{
    public class FreelancerRL : IFreelancerRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;
        private readonly UserInterfaceSL userInterface;

        public FreelancerRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory, UserInterfaceSL userInterface)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
            this.userInterface = userInterface;
        }
        public async Task<bool> AddFreelancerInformation(Freelancer freelancer)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if(mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.freelancerInformation;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@userID", freelancer.userID);
                    sqlCommand.Parameters.AddWithValue("@gender", freelancer.gender);
                    sqlCommand.Parameters.AddWithValue("@education", freelancer.education);
                    sqlCommand.Parameters.AddWithValue("@language", freelancer.language);

                    await sqlCommand.ExecuteNonQueryAsync();

                    return true;

                }                


            }
            catch (Exception ex) 
            {
                return false;
            }
            

        }
        public async Task<Freelancer> findFreelancer(int freelancerid)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.findFreelancer;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@freelancerID", freelancerid);


                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {
                            int freelancerID = (int)reader["freelancerID"];
                            int userid = (int)reader["userid"];
                            int ExperienceYears = (int)reader["ExperienceYears"];
                            string gender = reader["gender"].ToString().Trim();
                            float rating = (float)reader["rating"];
                            int totalCompletedOrders = (int)reader["totalCompletedOrders"];
                            bool availabilityStatus = (bool)reader["availabilityStatus"];
                            string education = (string)reader["education"];
                            string language = (string)reader["language"];
                            User user = await userInterface.findUser(userid);
                            return new Freelancer(freelancerID,userid, ExperienceYears, rating, totalCompletedOrders, availabilityStatus, gender, education, language, user);
                        }
                        else
                        {

                            return null;
                        }
                    }
                }

            }


            catch (Exception ex)
            {
                return null;
            }


        }
    }
}
