using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.CommonLayer.Model.SearchResult
{
    public class SearchResult
    {
        public int GigId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Picture { get; set; }  
        public string Video { get; set; }

        public FreelancerResult Freelancer { get; set; }
        public GigPackageResult BasicPackage { get; set; }
        public GigPackageResult StandardPackage { get; set; }
        public GigPackageResult PremiumPackage { get; set; }
    }
}
