namespace skillhub.CommonLayer.Model.GigPackages
{
    public abstract class GigPackage
    {
        public int gigpackageId { get; protected set; }
        public int GigId { get; protected set; }
        public float Price { get; protected set; }
        public int DeliveryDays { get; protected set; }
        public string Description { get; protected set; }

        public string PackageType { get; protected set; }

        protected GigPackage(int gigId, float price, int deliveryDays, string description)
        {
            GigId = gigId;
            Price = price;
            DeliveryDays = deliveryDays;
            Description = description;
        }
        protected GigPackage(int gigpackageId, int gigId, float price, int deliveryDays, string description)
        {
            this.gigpackageId = gigpackageId;
            GigId = gigId;
            Price = price;
            DeliveryDays = deliveryDays;
            Description = description;
        }

        public GigPackage(string packageType, float price, int deliveryDays, string description)
        {
            PackageType = packageType;
            Price = price;
            DeliveryDays = deliveryDays;
            Description = description;
        }

        public abstract string GetPackageType();
    }

}
