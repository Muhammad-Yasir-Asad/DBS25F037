using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigPackagePremiumSL
    {
        public Task<bool> AddGigPackage(GigPackageRequest gigPackage);


        public Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id);
    }
}
