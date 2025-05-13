using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.Interfaces.IRepositryLayer
{
    public interface IGigPackageRL
    {

        public Task<int> AddGigPackage(GigPackage gigpackage, string packageType);
        public Task<bool> UpdateGigPackage(GigPackage gigPackage, int gigPackageId, string packageType);
    }

}
