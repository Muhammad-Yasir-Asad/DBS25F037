using skillhub.CommonLayer.Model.Freelancer;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IFreelancerSL
    {
        public Task<bool> AddFreelancerInformation(FreelancerRequest freelancer);
        public Task<Freelancer> findFreelancer(int freelancerid);

    }
}
