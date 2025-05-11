namespace skillhub.CommonLayer.Model.GigPackages
{
    public class GigPackageBasic : GigPackage
    {
        public GigPackageBasic(int gigId, int price, int deliveryDays, string description)
            : base(gigId, price, deliveryDays, description) { }

        public override string GetPackageType()
        {
            return "Basic";
        }

        public string PackageType => GetPackageType();
    }

}
