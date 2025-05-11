namespace skillhub.CommonLayer.Model.GigPackages
{
    public class GigPackageRequest
    {
        public int GigId { get; set; }
        public int Price { get; set; }
        public int DeliveryDays { get; set; }
        public string Description { get; set; }
        public string PackageType { get; set; } // "Basic", "Standard", "Premium"
    }
}
