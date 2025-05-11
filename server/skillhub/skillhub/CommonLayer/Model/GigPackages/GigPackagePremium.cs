namespace skillhub.CommonLayer.Model.GigPackages
{
    public class GigPackagePremium : GigPackage
    {
        public GigPackagePremium(int gigId, int price, int deliveryDays, string description)
            : base(gigId, price, deliveryDays, description) { }

        public override string GetPackageType()
        {
            return "Premium";
        }
    }

}
