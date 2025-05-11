using skillhub.CommonLayer.Model.GigPackages;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class GigPackageBasicSL : GigPackageSL, IGigPackageBasicSL
    {
        private readonly IGigPackageRL gigPackageRL;


        // Constructor for setting package details manually (useful when data is coming from the controller)
        public GigPackageBasicSL(IGigPackageRL gigPackageRL)
        {
            this.gigPackageRL = gigPackageRL;
        }
        public override string GetPackageType()
        {
            return "Basic";
        }

        public override Task<bool> AddGigPackage(GigPackageRequest gigPackage)
        {
            GigPackageBasic gigPackageBasic = new GigPackageBasic(gigPackage.GigId, gigPackage.Price, gigPackage.DeliveryDays, gigPackage.Description);
            return gigPackageRL.AddGigPackage(gigPackageBasic, gigPackageBasic.GetPackageType());
        }
        public override Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id)
        {
            GigPackageBasic gigPackageBasic = new GigPackageBasic(gigPackage.GigId, gigPackage.Price, gigPackage.DeliveryDays, gigPackage.Description);
            return gigPackageRL.UpdateGigPackage(gigPackageBasic, id, gigPackageBasic.GetPackageType());
        }
    }

}
