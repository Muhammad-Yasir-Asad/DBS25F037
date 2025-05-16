using MySqlConnector;
using skillhub.CommonLayer.Model.SearchResult;
using skillhub.Helpers;
using skillhub.Interfaces.IRepositryLayer;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using skillhub.ServiceLayer;

namespace skillhub.RepositeryLayer
{
    public class GigSearchRepository : IGigSearchRepository
    {
        private readonly IConfiguration configuration;
        private readonly IDbConnectionFactory dbConnectionFactory;

        public GigSearchRepository(IConfiguration configuration, IDbConnectionFactory dbConnectionFactory)
        {
            this.configuration = configuration;
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<List<SearchResult>> SearchGigsAsync(string query)
        {
            var results = new List<SearchResult>();
            await using var connection = dbConnectionFactory.CreateConnection();

            if (connection.State != System.Data.ConnectionState.Open)
                await connection.OpenAsync();

            var gigs = await GetGigBaseInfo(query, connection);
            var packages = await GetPackagesInfo(gigs.Select(g => g.GigId).ToList(), connection);
            var packageIds = packages.Select(p => p.PackageId).ToList();
            var packageSkills = await GetPackageSkillsInfo(packageIds, connection);

            foreach (var gig in gigs)
            {
                var result = new SearchResult
                {
                    GigId = gig.GigId,
                    Title = gig.Title,
                    Description = gig.Description,
                    Category = gig.Category,
                    Picture = gig.Picture,
                    Video = gig.Video,
                    Freelancer = gig.Freelancer,
                    BasicPackage = AddSkills(packages.FirstOrDefault(p => p.GigId == gig.GigId && p.PackageType == "Basic"), packageSkills),
                    StandardPackage = AddSkills(packages.FirstOrDefault(p => p.GigId == gig.GigId && p.PackageType == "Standard"), packageSkills),
                    PremiumPackage = AddSkills(packages.FirstOrDefault(p => p.GigId == gig.GigId && p.PackageType == "Premium"), packageSkills)
                };
                results.Add(result);
            }

            return results;
        }

        private GigPackageResult AddSkills(GigPackageResult package, Dictionary<int, List<string>> skillMap)
        {
            if (package != null && skillMap.TryGetValue(package.PackageId, out var skills))
            {
                package.Skills = skills;
            }
            return package;
        }

        private async Task<List<GigBaseInfo>> GetGigBaseInfo(string query, MySqlConnection connection)
        {
            var gigs = new List<GigBaseInfo>();
            const string sql = @"
                SELECT 
                    g.gigId, 
                    g.title, 
                    g.description, 
                    l.value AS Category,
                    g.picture,
                    g.video,
                    g.AvgRating,
                    fp.freelancerID, 
                    fp.gender, 
                    fp.education, 
                    fp.language,
                    fp.totalCompletedOrders,
                    u.userID,
                    u.firstName, 
                    u.lastName, 
                    u.username, 
                    u.profilePicture,
                    u.country, 
                    u.bio,
                    u.joinDate
                FROM gig g
                INNER JOIN freelancerprofile fp ON g.userId = fp.userID
                INNER JOIN `user` u ON fp.userID = u.userID
                LEFT JOIN lookup l ON g.categoryId = l.lookupID
                WHERE g.title LIKE @Query OR g.description LIKE @Query;
            ";

            using var command = new MySqlCommand(sql, connection);
            command.Parameters.AddWithValue("@Query", $"%{query}%");

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                gigs.Add(new GigBaseInfo
                {
                    userID = reader.GetInt32("userID"),
                    GigId = reader.GetInt32("gigId"),
                    Title = reader.GetString("title"),
                    Description = reader.GetString("description"),
                    Category = reader.IsDBNull("Category") ? null : reader.GetString("Category"),
                    Picture = reader.IsDBNull("picture") ? null : reader.GetString("picture"),
                    Video = reader.IsDBNull("video") ? null : reader.GetString("video"),
                    profilePicture = reader.IsDBNull("profilePicture") ? null : reader.GetString("profilePicture"),
                    AvgRating = reader.IsDBNull(reader.GetOrdinal("AvgRating")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("AvgRating")),
                    Freelancer = new FreelancerResult
                    {
                        FreelancerId = reader.GetInt32("freelancerID"),
                        Gender = reader.GetString("gender"),
                        Education = reader.GetString("education"),
                        Language = reader.GetString("language"),
                        totalCompletedOrders = reader.GetInt32("totalCompletedOrders"),
                        User = new UserResult
                        {
                            userID = reader.GetInt32("userID"),
                            FirstName = reader.GetString("firstName"),
                            LastName = reader.GetString("lastName"),
                            Username = reader.GetString("username"),
                            Bio = reader.GetString("bio"),
                            Country = reader.GetString("country"),
                            profilePicture = reader.GetString("profilePicture"),
                            JoinDate = reader.GetDateTime("joinDate")
                        }
                    }
                });
            }

            return gigs;
        }

        private async Task<List<GigPackageResult>> GetPackagesInfo(List<int> gigIds, MySqlConnection connection)
        {
            var packages = new List<GigPackageResult>();
            if (!gigIds.Any()) return packages;

            var sql = $@"
                SELECT 
                    packageId,
                    gigId, 
                    packageType, 
                    price, 
                    deliveryDays, 
                    description
                FROM gigpackage
                WHERE gigId IN ({string.Join(",", gigIds.Select((_, i) => $"@GigId{i}"))})";

            using var command = new MySqlCommand(sql, connection);
            for (var i = 0; i < gigIds.Count; i++)
                command.Parameters.AddWithValue($"@GigId{i}", gigIds[i]);

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                packages.Add(new GigPackageResult
                {
                    PackageId = reader.GetInt32("packageId"),
                    GigId = reader.GetInt32("gigId"),
                    PackageType = reader.GetString("packageType"),
                    Price = reader.GetInt32("price"),
                    DeliveryDays = reader.GetInt32("deliveryDays"),
                    Description = reader.GetString("description")
                });
            }

            return packages;
        }

        private async Task<Dictionary<int, List<string>>> GetPackageSkillsInfo(List<int> packageIds, MySqlConnection connection)
        {
            var skillMap = new Dictionary<int, List<string>>();
            if (!packageIds.Any()) return skillMap;

            var sql = $@"
                SELECT 
                    gps.packageId,
                    s.skillName
                FROM gigpackageskill gps
                INNER JOIN skill s ON gps.skillId = s.skillID
                WHERE gps.packageId IN ({string.Join(",", packageIds.Select((_, i) => $"@PkgId{i}"))})";

            using var command = new MySqlCommand(sql, connection);
            for (var i = 0; i < packageIds.Count; i++)
                command.Parameters.AddWithValue($"@PkgId{i}", packageIds[i]);

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var packageId = reader.GetInt32("packageId");
                var skillName = reader.GetString("skillName");

                if (!skillMap.ContainsKey(packageId))
                    skillMap[packageId] = new List<string>();

                skillMap[packageId].Add(skillName);
            }

            return skillMap;
        }

        private class GigBaseInfo
        {
            public int userID { get; set; }
            public int GigId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public string Picture { get; set; }
            public string Video { get; set; }

            public string profilePicture { get; set; }

            public decimal? AvgRating { get; set; }
            public FreelancerResult Freelancer { get; set; }
        }
    }
}
