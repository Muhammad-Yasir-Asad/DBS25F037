using skillhub.CommonLayer.Model.Gig;

namespace skillhub.Interfaces.IRepositryLayer
{
        public interface IGigRL
        {
        public Task<int> AddFreelancerGig(Gig gig); 
        public Task<bool> DeleteGig(int id);

            public Task<bool> UpdateGig(int id, Gig gig);
        public Task<Gig> GetGig(int id);

        }   
}
