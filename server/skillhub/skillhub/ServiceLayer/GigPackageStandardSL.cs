using skillhub.CommonLayer.Model.GigPackages;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class GigPackageStandardSL : GigPackageSL, IGigPackageStandardSL
    {
        public readonly IGigPackageRL gigPackageRL;
        // Constructor with dependency injection

        public GigPackageStandardSL(IGigPackageRL gigPackageRL)
        {
            this.gigPackageRL = gigPackageRL;
        }
        public override string GetPackageType()
        {
            return "Standard";
        }

        public override Task<bool> AddGigPackage(GigPackageRequest gigPackage)
        {
            GigPackageStandard gigPackageStandard = new GigPackageStandard(gigPackage.GigId, gigPackage.Price, gigPackage.DeliveryDays, gigPackage.Description);
            return gigPackageRL.AddGigPackage(gigPackageStandard, gigPackageStandard.GetPackageType());
        }
        public override Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id)
        {
            GigPackageStandard gigPackageStandard = new GigPackageStandard(gigPackage.GigId, gigPackage.Price, gigPackage.DeliveryDays, gigPackage.Description);
            return gigPackageRL.UpdateGigPackage(gigPackageStandard, id, gigPackageStandard.GetPackageType());
        }

    }

}
