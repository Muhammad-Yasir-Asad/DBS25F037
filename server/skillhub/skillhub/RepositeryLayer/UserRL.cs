using System.IdentityModel.Tokens.Jwt;
using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.Common_Utility;
using skillhub.CommonLayer.Model.Users;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.ServiceLayer;


namespace skillhub.RepositeryLayer
{
    public class UserRL : UserInterfaceRL
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;
        private readonly IWalletRL walletRL;

        public UserRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
        }

       

        public async Task<UserRegisterResponse> RegisterUser(User user)
        {
            UserRegisterResponse response = new UserRegisterResponse();


            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.RegisterUser;

                if (string.IsNullOrWhiteSpace(commandText))
                {
                    throw new InvalidOperationException("The SQL query for RegisterUser is not defined or is empty.");
                }

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@email", user.email);
                    string passwordHash = PasswordHasher.HashPassword(user.passwordHash);
                    sqlCommand.Parameters.AddWithValue("@passwordHash", passwordHash);
                    sqlCommand.Parameters.AddWithValue("@userName", user.userName);
                    sqlCommand.Parameters.AddWithValue("@roleID", user.roleID);

                    int status = await sqlCommand.ExecuteNonQueryAsync();

                    response.isSuccess = status > 0;
                    response.message = status > 0 ? "Registration successful" : "Failed to register user";
                   
                }
            }
            catch (Exception ex)
            {
                response.isSuccess = false;
                response.message = ex.Message;
                Console.WriteLine(ex);
            }

            return response;
        }

        public async Task<string> AuthenticateUser(User authUser)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.AuthenticateUser;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@email", authUser.email);
                    sqlCommand.Parameters.AddWithValue("@password", authUser.passwordHash);

                    using var reader = await sqlCommand.ExecuteReaderAsync();

                    if (await reader.ReadAsync())
                    {
                        var storedHash = reader.GetString("PasswordHash");
                        var userID = reader.GetInt32("userID");
                        var userName = reader.GetString("userName");
                        var roleID = reader.GetInt32("roleID");

                        string role = roleID switch
                        {
                            1 => "User",
                            2 => "Admin",
                            _ => "Unknown"
                        };

                        if (PasswordHasher.VerifyPassword(authUser.passwordHash, storedHash))
                        {
                            return JwtHelper.GenerateToken(userID, authUser.email, userName, role, configuration);
                        }
                        else
                        {
                            return "Invalid credentials";
                        }
                    }
                    else
                    {
                        return "Invalid credentials";
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return "Error occurred during authentication";
            }
        }

        public async Task<bool> CheckEmailExists(string email)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.emailExists;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@email", email);
                    int userCount = Convert.ToInt32(await sqlCommand.ExecuteScalarAsync());
                    return userCount > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
       
        public async Task<bool> CheckUserNameExists(string userName)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.userNameExists;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@userName", userName);
                    int userCount = Convert.ToInt32(await sqlCommand.ExecuteScalarAsync());
                    return userCount > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public async Task<bool> AddPersonalInformation(User personalInformation)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.AddPersonalInformation;

                if (string.IsNullOrWhiteSpace(commandText))
                {
                    throw new InvalidOperationException("The SQL query for Personal Information is not defined or is empty.");
                }

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@UserID", personalInformation.userID);
                    sqlCommand.Parameters.AddWithValue("@FirstName", personalInformation.firstName);
                    sqlCommand.Parameters.AddWithValue("@LastName", personalInformation.lastName);
                    sqlCommand.Parameters.AddWithValue("@Phone", personalInformation.phone);
                    sqlCommand.Parameters.AddWithValue("@Country", personalInformation.country);
                    sqlCommand.Parameters.AddWithValue("@ProfilePicturePath", personalInformation.profilePicture); 
                    sqlCommand.Parameters.AddWithValue("@Bio", personalInformation.bio);

                    int rowsAffected = await sqlCommand.ExecuteNonQueryAsync();
                    return rowsAffected > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error adding personal information: " + ex.Message);
                return false;
            }
        }



       
        public async Task<User> findUser(int userid)
        {

            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.FindUser;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@userId", userid);
                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {

                            return new User(
                                (int)reader["userID"],
                                reader["firstName"].ToString(),
                                reader["lastName"].ToString(),
                                reader["email"].ToString(),
                                reader["passwordHash"].ToString(),
                                reader["profilePicture"].ToString(),
                                (int)reader["roleID"],
                                reader["joinDate"].ToString(),
                                reader["bio"].ToString(),
                                reader["phone"].ToString(),
                                reader["username"].ToString(),
                                reader["country"].ToString()
                            );
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

        public async Task<User> finduser(int userid)
        {

            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != System.Data.ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.FindUser;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = System.Data.CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@userId", userid);
                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        if (reader.Read())
                        {

                            return new User(
                                (int)reader["userID"],
                                reader["firstName"].ToString(),
                                reader["lastName"].ToString(),
                                reader["email"].ToString(),
                                reader["passwordHash"].ToString(),
                                reader["profilePicture"].ToString(),
                                (int)reader["roleID"],
                                reader["joinDate"].ToString(),
                                reader["bio"].ToString(),
                                reader["phone"].ToString(),
                                reader["username"].ToString(),
                                reader["country"].ToString()
                            );
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



