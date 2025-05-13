using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigPackageStandardSL
    {
        public Task<int> AddGigPackage(GigPackageRequest gigPackage);
        public Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id);
    }
}
