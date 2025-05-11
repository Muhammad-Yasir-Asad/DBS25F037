namespace skillhub.Interfaces.IRepositryLayer
{
        public interface IGigRL
        {
            public Task<bool> AddFreelancerGig(Gig gig);
            public Task<bool> DeleteGig(int id);

            public Task<bool> UpdateGig(int id, Gig gig);

        }   
}
