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
    public class UserRL : UserInterfaceRL, IWalletRL
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
                    Wallet wallet = new Wallet(user.userID);
                    MakeWallet(wallet);
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

        //public async Task<bool> AddPersonalInformation(User persnalInformation)
        //{
        //    await using var mysqlconnection = dbConnectionFactory.CreateConnection();

        //    try
        //    {
        //        if(mysqlconnection.State != System.Data.ConnectionState.Open)
        //        {
        //            await mysqlconnection.OpenAsync();
        //        }

        //        string commandText = commandType
        //    }
        //}

        public Task<bool> profileInformation(User personalInformation)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AddPersonalInformation(User personalInformation)
        {
            throw new NotImplementedException();
        }

        public Task<bool> MakeWallet(Wallet wallet)
        {
            
            return walletRL.MakeWallet(wallet);
            
        }
    }

}

