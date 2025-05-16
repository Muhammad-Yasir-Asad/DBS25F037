using skillhub.CommonLayer.Model.GigPackages;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class GigPackageBasicSL : GigPackageSL, IGigPackageBasicSL
    {
        private readonly IGigPackageRL gigPackageRL;

        public GigPackageBasicSL(IGigPackageRL gigPackageRL)
        {
            this.gigPackageRL = gigPackageRL;
        }
        public override string GetPackageType()
        {
            return "Basic";
        }

        public override async Task<int> AddGigPackage(GigPackageRequest gigPackage)
        {
            GigPackageBasic gigPackageBasic = new GigPackageBasic(
                gigPackage.GigId,
                gigPackage.Price,
                gigPackage.DeliveryDays,
                gigPackage.Description
            );
            return await gigPackageRL.AddGigPackage(gigPackageBasic, "Basic");
        }
        public override Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id)
        {
            GigPackageBasic gigPackageBasic = new GigPackageBasic(gigPackage.GigId, gigPackage.Price, gigPackage.DeliveryDays, gigPackage.Description);
            return gigPackageRL.UpdateGigPackage(gigPackageBasic, id, gigPackageBasic.GetPackageType());
        }

        public override Task<GigPackage> GetGigPackage(int id)
        {
            return gigPackageRL.GetGigPackage(id);
        }
    }

}
