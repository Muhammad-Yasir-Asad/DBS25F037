namespace skillhub.CommonLayer.Model.GigPackages
{
    public class GigPackagePremium : GigPackage
    {
        public GigPackagePremium(int gigId, float price, int deliveryDays, string description)
            : base(gigId, price, deliveryDays, description) { }
        public GigPackagePremium(int gigpackageId, int gigId, float price, string packageType, int deliveryDays, string description):base(gigpackageId, gigId, price, deliveryDays, description)
        {
            this.gigpackageId = gigpackageId;
            this.GigId = gigId;
            this.Price = price;
            this.DeliveryDays = deliveryDays;
            this.Description = description;
        }

        public override string GetPackageType()
        {
            return "Premium";
        }
    }

}
