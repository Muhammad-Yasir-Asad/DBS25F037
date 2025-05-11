namespace skillhub.CommonLayer.Model.GigPackages
{
        public class GigPackageStandard : GigPackage
        {
            public GigPackageStandard(int gigId, int price, int deliveryDays, string description)
            : base(gigId, price, deliveryDays, description) { }

            public override string GetPackageType()
            {
                return "Standard";
            }
        }

    
}
