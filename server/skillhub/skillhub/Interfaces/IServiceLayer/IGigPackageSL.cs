using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigPackageSL
    {
        public abstract string GetPackageType();
        public Task<bool> AddGigPackage(GigPackageRequest gigPackage);
        public abstract Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id);
    }

}
