namespace skillhub.CommonLayer.Model.SearchResult
{
    public class FreelancerResult
    {
        public int FreelancerId { get; set; }
        public string Gender { get; set; }
        public string Education { get; set; }
        public string Language { get; set; }
        public UserResult User { get; set; }
    }
}
