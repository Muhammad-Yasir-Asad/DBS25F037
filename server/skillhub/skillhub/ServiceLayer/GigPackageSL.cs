using skillhub.CommonLayer.Model.GigPackages;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public abstract class GigPackageSL : IGigPackageSL
    {
        public abstract string GetPackageType();
        public abstract Task<int> AddGigPackage(GigPackageRequest gigPackage);

        public abstract Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id);



        //

    }

}
