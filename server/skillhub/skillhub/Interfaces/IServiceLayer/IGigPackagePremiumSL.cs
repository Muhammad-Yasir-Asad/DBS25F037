using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigPackagePremiumSL
    {
        Task<int> AddGigPackage(GigPackageRequest gigPackage); // Return int (PackageId)
        Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id);
    }
}
