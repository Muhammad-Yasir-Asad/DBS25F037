using skillhub.CommonLayer.Model.Gig;
using skillhub.CommonLayer.Model.GigPackages;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigSL
    {

        public Task<int> AddFreelancerGig(GigRequest gigRequest);
        public Task<bool> DeleteGig(int id);
        public Task<Gig> GetGig(int id);

        public Task<bool> UpdateGig(int id, GigRequest gigRequest);
    }
}
