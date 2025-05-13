using System.Data;
using Microsoft.AspNetCore.Connections;
using skillhub.Interfaces.IRepositryLayer;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using skillhub.Common_Utilities;
using skillhub.Common_Utility;
using skillhub.CommonLayer.Model.Users;
using skillhub.Helpers;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace skillhub.RepositeryLayer
{
    public class ReportRL : IReportRL

    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;

        public ReportRL(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
        }
        public async Task<DataTable> BlockedReport()
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.BlockedReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("Blocker", typeof(string));
                        dataTable.Columns.Add("Blocked", typeof(string));
                        dataTable.Columns.Add("Reason", typeof(string));
                        dataTable.Columns.Add("Date", typeof(DateOnly));
                        dataTable.Columns.Add("Time", typeof(TimeSpan));

                        while (await reader.ReadAsync())
                        {
                            string blocker = reader["Blocker"]?.ToString() ?? string.Empty;
                            string blocked = reader["Blocked"]?.ToString() ?? string.Empty;
                            string reason = reader["Reason"]?.ToString() ?? string.Empty;
                            DateOnly date = reader["Date"] != DBNull.Value ? DateOnly.FromDateTime(Convert.ToDateTime(reader["Date"])) : DateOnly.MinValue;
                            TimeSpan time = reader["Time"] != DBNull.Value ? (TimeSpan)reader["Time"] : TimeSpan.Zero;

                            dataTable.Rows.Add(blocker, blocked, reason, date, time);
                        }



                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"BlockedReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> ClientsReport()
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.ClientsReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("username", typeof(string));
                        dataTable.Columns.Add("email", typeof(string));
                        dataTable.Columns.Add("joinDate", typeof(DateTime));
                        dataTable.Columns.Add("bio", typeof(string));
                        dataTable.Columns.Add("phone", typeof(string));
                        dataTable.Columns.Add("country", typeof(string));
                        dataTable.Columns.Add("role", typeof(string));

                        while (reader.Read())
                        {
                            string username = reader["username"]?.ToString() ?? string.Empty;
                            string email = reader["email"]?.ToString() ?? string.Empty;
                            DateTime joinDate = reader["joinDate"] != DBNull.Value ? Convert.ToDateTime(reader["joinDate"]) : DateTime.MinValue;
                            string bio = reader["bio"]?.ToString() ?? string.Empty;
                            string phone = reader["phone"]?.ToString() ?? string.Empty;
                            string country = reader["country"]?.ToString() ?? string.Empty;
                            string role = reader["role"]?.ToString() ?? string.Empty;

                            dataTable.Rows.Add(username, email, joinDate, bio, phone, country, role);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"ClientsReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> CompletedOrderReport(DateOnly date)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.CompletedOrderReportbyDate;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@date", date.ToDateTime(TimeOnly.MinValue));

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("client", typeof(string));
                        dataTable.Columns.Add("freelancer", typeof(string));
                        dataTable.Columns.Add("title", typeof(string));
                        dataTable.Columns.Add("orderdate", typeof(DateTime));
                        dataTable.Columns.Add("status", typeof(string));
                        dataTable.Columns.Add("duedate", typeof(DateTime));
                        dataTable.Columns.Add("coinAmount", typeof(decimal));
                        dataTable.Columns.Add("completionDate", typeof(DateTime));

                        while (reader.Read())
                        {
                            string client = reader["client"]?.ToString() ?? string.Empty;
                            string freelancer = reader["freelancer"]?.ToString() ?? string.Empty;
                            string title = reader["title"]?.ToString() ?? string.Empty;
                            DateTime orderDate = reader["orderdate"] != DBNull.Value ? Convert.ToDateTime(reader["orderdate"]) : DateTime.MinValue;
                            string status = reader["status"]?.ToString() ?? string.Empty;
                            DateTime dueDate = reader["duedate"] != DBNull.Value ? Convert.ToDateTime(reader["duedate"]) : DateTime.MinValue;
                            decimal coinAmount = reader["coinAmount"] != DBNull.Value ? Convert.ToDecimal(reader["coinAmount"]) : 0;
                            DateTime completionDate = reader["completionDate"] != DBNull.Value ? Convert.ToDateTime(reader["completionDate"]) : DateTime.MinValue;

                            dataTable.Rows.Add(client, freelancer, title, orderDate, status, dueDate, coinAmount, completionDate);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"CompletedOrderReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> FreelacnerOrderReport(int orders)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.FreelacnerOrderReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@orders", orders);

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("username", typeof(string));
                        dataTable.Columns.Add("ExperienceYears", typeof(int));
                        dataTable.Columns.Add("gender", typeof(string));
                        dataTable.Columns.Add("rating", typeof(decimal));
                        dataTable.Columns.Add("totalCompletedOrders", typeof(int));
                        dataTable.Columns.Add("availabilityStatus", typeof(string));
                        dataTable.Columns.Add("education", typeof(string));
                        dataTable.Columns.Add("language", typeof(string));

                        while (reader.Read())
                        {
                            string username = reader["username"]?.ToString() ?? string.Empty;
                            int experience = reader["ExperienceYears"] != DBNull.Value ? Convert.ToInt32(reader["ExperienceYears"]) : 0;
                            string gender = reader["gender"]?.ToString() ?? string.Empty;
                            decimal rating = reader["rating"] != DBNull.Value ? Convert.ToDecimal(reader["rating"]) : 0;
                            int totalCompleted = reader["totalCompletedOrders"] != DBNull.Value ? Convert.ToInt32(reader["totalCompletedOrders"]) : 0;
                            string status = reader["availabilityStatus"]?.ToString() ?? string.Empty;
                            string education = reader["education"]?.ToString() ?? string.Empty;
                            string language = reader["language"]?.ToString() ?? string.Empty;

                            dataTable.Rows.Add(username, experience, gender, rating, totalCompleted, status, education, language);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"FreelacnerOrderReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> FreelancerExperinceReport(int year)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.FreelancerExperinceReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;
                    sqlCommand.Parameters.AddWithValue("@years", year);

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("username", typeof(string));
                        dataTable.Columns.Add("ExperienceYears", typeof(int));
                        dataTable.Columns.Add("gender", typeof(string));
                        dataTable.Columns.Add("rating", typeof(decimal));
                        dataTable.Columns.Add("totalCompletedOrders", typeof(int));
                        dataTable.Columns.Add("availabilityStatus", typeof(string));
                        dataTable.Columns.Add("education", typeof(string));
                        dataTable.Columns.Add("language", typeof(string));

                        while (reader.Read())
                        {
                            string username = reader["username"]?.ToString() ?? string.Empty;
                            int experienceYears = reader["ExperienceYears"] != DBNull.Value ? Convert.ToInt32(reader["ExperienceYears"]) : 0;
                            string gender = reader["gender"]?.ToString() ?? string.Empty;
                            decimal rating = reader["rating"] != DBNull.Value ? Convert.ToDecimal(reader["rating"]) : 0;
                            int completedOrders = reader["totalCompletedOrders"] != DBNull.Value ? Convert.ToInt32(reader["totalCompletedOrders"]) : 0;
                            string status = reader["availabilityStatus"]?.ToString() ?? string.Empty;
                            string education = reader["education"]?.ToString() ?? string.Empty;
                            string language = reader["language"]?.ToString() ?? string.Empty;

                            dataTable.Rows.Add(username, experienceYears, gender, rating, completedOrders, status, education, language);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"FreelancerExperinceReport Exception: {ex.Message}");
                return null;
            }
        }
        public async Task<DataTable> FreeLancerReport()
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.FreeLancerReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("username", typeof(string));
                        dataTable.Columns.Add("ExperienceYears", typeof(int));
                        dataTable.Columns.Add("gender", typeof(string));
                        dataTable.Columns.Add("rating", typeof(decimal));
                        dataTable.Columns.Add("totalCompletedOrders", typeof(int));
                        dataTable.Columns.Add("availabilityStatus", typeof(string));
                        dataTable.Columns.Add("education", typeof(string));
                        dataTable.Columns.Add("language", typeof(string));

                        while (reader.Read())
                        {
                            string username = reader["username"]?.ToString() ?? string.Empty;
                            int experienceYears = reader["ExperienceYears"] != DBNull.Value ? Convert.ToInt32(reader["ExperienceYears"]) : 0;
                            string gender = reader["gender"]?.ToString() ?? string.Empty;
                            decimal rating = reader["rating"] != DBNull.Value ? Convert.ToDecimal(reader["rating"]) : 0;
                            int completedOrders = reader["totalCompletedOrders"] != DBNull.Value ? Convert.ToInt32(reader["totalCompletedOrders"]) : 0;
                            string status = reader["availabilityStatus"]?.ToString() ?? string.Empty;
                            string education = reader["education"]?.ToString() ?? string.Empty;
                            string language = reader["language"]?.ToString() ?? string.Empty;

                            dataTable.Rows.Add(username, experienceYears, gender, rating, completedOrders, status, education, language);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"FreeLancerReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> GigReport()
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.GigReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("gigOwner", typeof(string));
                        dataTable.Columns.Add("title", typeof(string));
                        dataTable.Columns.Add("description", typeof(string));
                        dataTable.Columns.Add("category", typeof(string));
                        dataTable.Columns.Add("createdDate", typeof(DateTime));
                        dataTable.Columns.Add("updatedDate", typeof(DateTime));
                        dataTable.Columns.Add("avgRating", typeof(decimal));
                        dataTable.Columns.Add("picture", typeof(string));
                        dataTable.Columns.Add("video", typeof(string));

                        while (reader.Read())
                        {
                            string gigOwner = reader["gigOwner"]?.ToString() ?? string.Empty;
                            string title = reader["title"]?.ToString() ?? string.Empty;
                            string description = reader["description"]?.ToString() ?? string.Empty;
                            string category = reader["category"]?.ToString() ?? string.Empty;
                            DateTime createdDate = reader["createdDate"] != DBNull.Value ? Convert.ToDateTime(reader["createdDate"]) : DateTime.MinValue;
                            DateTime updatedDate = reader["updatedDate"] != DBNull.Value ? Convert.ToDateTime(reader["updatedDate"]) : DateTime.MinValue;
                            decimal avgRating = reader["avgRating"] != DBNull.Value ? Convert.ToDecimal(reader["avgRating"]) : 0;
                            string picture = reader["picture"]?.ToString() ?? string.Empty;
                            string video = reader["video"]?.ToString() ?? string.Empty;

                            dataTable.Rows.Add(gigOwner, title, description, category, createdDate, updatedDate, avgRating, picture, video);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"GigReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> OrderCoinReport(int coins)
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                {
                    await mySqlConnection.OpenAsync();
                }

                string commandText = SqlQueries.OrderBYCoinReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    sqlCommand.Parameters.AddWithValue("@coins", coins);

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("client", typeof(string));
                        dataTable.Columns.Add("freelancer", typeof(string));
                        dataTable.Columns.Add("title", typeof(string));
                        dataTable.Columns.Add("orderdate", typeof(DateTime));
                        dataTable.Columns.Add("status", typeof(string));
                        dataTable.Columns.Add("duedate", typeof(DateTime));
                        dataTable.Columns.Add("coinAmount", typeof(decimal));
                        dataTable.Columns.Add("completionDate", typeof(DateTime));

                        while (reader.Read())
                        {
                            string client = reader["client"]?.ToString() ?? string.Empty;
                            string freelancer = reader["freelancer"]?.ToString() ?? string.Empty;
                            string title = reader["title"]?.ToString() ?? string.Empty;
                            DateTime orderDate = reader["orderdate"] != DBNull.Value ? Convert.ToDateTime(reader["orderdate"]) : DateTime.MinValue;
                            string status = reader["status"]?.ToString() ?? string.Empty;
                            DateTime dueDate = reader["duedate"] != DBNull.Value ? Convert.ToDateTime(reader["duedate"]) : DateTime.MinValue;
                            decimal coinAmount = reader["coinAmount"] != DBNull.Value ? Convert.ToDecimal(reader["coinAmount"]) : 0;
                            DateTime completionDate = reader["completionDate"] != DBNull.Value ? Convert.ToDateTime(reader["completionDate"]) : DateTime.MinValue;

                            dataTable.Rows.Add(client, freelancer, title, orderDate, status, dueDate, coinAmount, completionDate);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"OrderCoinReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> OrderReport()
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                    await mySqlConnection.OpenAsync();

                string commandText = SqlQueries.OrderReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("client", typeof(string));
                        dataTable.Columns.Add("freelancer", typeof(string));
                        dataTable.Columns.Add("title", typeof(string));
                        dataTable.Columns.Add("orderdate", typeof(DateTime));
                        dataTable.Columns.Add("status", typeof(string));
                        dataTable.Columns.Add("duedate", typeof(DateTime));
                        dataTable.Columns.Add("coinAmount", typeof(decimal));
                        dataTable.Columns.Add("completionDate", typeof(DateTime));

                        while (reader.Read())
                        {
                            string client = reader["client"]?.ToString() ?? string.Empty;
                            string freelancer = reader["freelancer"]?.ToString() ?? string.Empty;
                            string title = reader["title"]?.ToString() ?? string.Empty;
                            DateTime orderDate = reader["orderdate"] != DBNull.Value ? Convert.ToDateTime(reader["orderdate"]) : DateTime.MinValue;
                            string status = reader["status"]?.ToString() ?? string.Empty;
                            DateTime dueDate = reader["duedate"] != DBNull.Value ? Convert.ToDateTime(reader["duedate"]) : DateTime.MinValue;
                            decimal coinAmount = reader["coinAmount"] != DBNull.Value ? Convert.ToDecimal(reader["coinAmount"]) : 0;
                            DateTime completionDate = reader["completionDate"] != DBNull.Value ? Convert.ToDateTime(reader["completionDate"]) : DateTime.MinValue;

                            dataTable.Rows.Add(client, freelancer, title, orderDate, status, dueDate, coinAmount, completionDate);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"OrderReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> PackageReport()
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                    await mySqlConnection.OpenAsync();

                string commandText = SqlQueries.PackageReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("username", typeof(string));
                        dataTable.Columns.Add("packageType", typeof(string));
                        dataTable.Columns.Add("price", typeof(decimal));
                        dataTable.Columns.Add("deliveryDays", typeof(int));
                        dataTable.Columns.Add("description", typeof(string));

                        while (await reader.ReadAsync())
                        {
                            string username = reader["username"]?.ToString() ?? string.Empty;
                            string packageType = reader["packageType"]?.ToString() ?? string.Empty;
                            decimal price = reader["price"] != DBNull.Value ? Convert.ToDecimal(reader["price"]) : 0;
                            int deliveryDays = reader["deliveryDays"] != DBNull.Value ? Convert.ToInt32(reader["deliveryDays"]) : 0;
                            string description = reader["description"]?.ToString() ?? string.Empty;

                            dataTable.Rows.Add(username, packageType, price, deliveryDays, description);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"PackageReport Exception: {ex.Message}");
                return null;
            }
        }

        public async Task<DataTable> WalletReport()
        {
            await using var mySqlConnection = dbConnectionFactory.CreateConnection();

            try
            {
                if (mySqlConnection.State != ConnectionState.Open)
                    await mySqlConnection.OpenAsync();

                string commandText = SqlQueries.WalletReport;

                using (MySqlCommand sqlCommand = new MySqlCommand(commandText, mySqlConnection))
                {
                    sqlCommand.CommandType = CommandType.Text;
                    sqlCommand.CommandTimeout = 180;

                    using (var reader = await sqlCommand.ExecuteReaderAsync())
                    {
                        DataTable dataTable = new DataTable();

                        dataTable.Columns.Add("username", typeof(string));
                        dataTable.Columns.Add("coinbalance", typeof(decimal));
                        dataTable.Columns.Add("lastupdated", typeof(DateTime));
                        dataTable.Columns.Add("status", typeof(string));

                        while (await reader.ReadAsync())
                        {
                            string username = reader["username"]?.ToString() ?? string.Empty;
                            decimal coinBalance = reader["coinbalance"] != DBNull.Value ? Convert.ToDecimal(reader["coinbalance"]) : 0;
                            DateTime lastUpdated = reader["lastupdated"] != DBNull.Value ? Convert.ToDateTime(reader["lastupdated"]) : DateTime.MinValue;
                            string status = reader["status"]?.ToString() ?? string.Empty;

                            dataTable.Rows.Add(username, coinBalance, lastUpdated, status);
                        }

                        return dataTable;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"WalletReport Exception: {ex.Message}");
                return null;
            }
        }

    }
}
