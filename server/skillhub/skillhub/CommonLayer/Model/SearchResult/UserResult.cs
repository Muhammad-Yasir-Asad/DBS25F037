namespace skillhub.CommonLayer.Model.SearchResult
{
    public class UserResult
    {
        public int userID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Country { get; set; }

        public string Bio { get; set; }

        public string profilePicture { get; set; }
        public DateTime JoinDate { get; set; }
    }
}
