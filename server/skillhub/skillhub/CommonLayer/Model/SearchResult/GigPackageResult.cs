namespace skillhub.CommonLayer.Model.SearchResult
{
    public class GigPackageResult
    {
        public int PackageId { get; set; }       
        public int GigId { get; set; }
        public string PackageType { get; set; }
        public int Price { get; set; }
        public int DeliveryDays { get; set; }
        public string Description { get; set; }

        public List<string> Skills { get; set; }
    }
}
