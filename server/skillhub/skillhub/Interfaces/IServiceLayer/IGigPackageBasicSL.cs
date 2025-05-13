using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigPackageBasicSL
    {
        Task<int> AddGigPackage(GigPackageRequest gigPackage); 
        Task<bool> UpdateGigPackage(GigPackageRequest gigPackage, int id);

    }

}
