using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigPackageSL
    {
        public abstract string GetPackageType();
        public Task<int> AddGigPackage(GigPackageRequest gigPackage);
        public abstract Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id);
        public abstract Task<GigPackage> GetGigPackage(int id);
    }

}
