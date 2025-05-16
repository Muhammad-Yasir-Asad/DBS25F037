using skillhub.CommonLayer.Model.GigPackages;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;
using skillhub.RepositeryLayer;

namespace skillhub.ServiceLayer
{
    public abstract class GigPackageSL : IGigPackageSL
    {
        public readonly IGigPackageRL gigPackageInterface;
        public GigPackageSL(IGigPackageRL gigPackageInterface)
        {
            this.gigPackageInterface = gigPackageInterface;
        }
        public GigPackageSL()
        {
        }

        public abstract string GetPackageType();
        public abstract Task<int> AddGigPackage(GigPackageRequest gigPackage);

        public abstract Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id);

        public abstract Task<GigPackage> GetGigPackage(int id);
        
        



        //

    }

}
