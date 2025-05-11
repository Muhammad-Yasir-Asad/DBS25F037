
namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigSL
    {

        public Task<bool> AddFreelancerGig(GigRequest gigRequest);
        public Task<bool> DeleteGig(int id);

        public Task<bool> UpdateGig(int id, GigRequest gigRequest);
    }
}
