namespace skillhub.CommonLayer.Model.GigPackages
{
    public abstract class GigPackage
    {
        public int GigId { get; protected set; }
        public int Price { get; protected set; }
        public int DeliveryDays { get; protected set; }
        public string Description { get; protected set; }

        protected GigPackage(int gigId, int price, int deliveryDays, string description)
        {
            GigId = gigId;
            Price = price;
            DeliveryDays = deliveryDays;
            Description = description;
        }

        public abstract string GetPackageType();
    }

}
