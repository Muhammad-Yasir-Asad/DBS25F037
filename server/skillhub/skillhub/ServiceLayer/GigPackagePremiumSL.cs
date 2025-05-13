using skillhub.CommonLayer.Model.GigPackages;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class GigPackagePremiumSL : GigPackageSL, IGigPackagePremiumSL

    {
        public readonly IGigPackageRL gigPackageRL;
        // Constructor with dependency injection

        public GigPackagePremiumSL(IGigPackageRL gigPackageRL)
        {
            this.gigPackageRL = gigPackageRL;
        }
        public override string GetPackageType()
        {
            return "Premium";
        }
        public override Task<int> AddGigPackage(GigPackageRequest gigPackage)
        {
            GigPackagePremium gigPackagePremium = new GigPackagePremium(gigPackage.GigId, gigPackage.Price, gigPackage.DeliveryDays, gigPackage.Description);
            return gigPackageRL.AddGigPackage(gigPackagePremium, gigPackagePremium.GetPackageType());
        }
        public override Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id)
        {
            GigPackagePremium gigPackagePremium = new GigPackagePremium(gigPackage.GigId, gigPackage.Price, gigPackage.DeliveryDays, gigPackage.Description);
            return gigPackageRL.UpdateGigPackage(gigPackagePremium, id, gigPackagePremium.GetPackageType());
        }

    }
}
