using skillhub.CommonLayer.Model.Freelancer;

namespace skillhub.Interfaces.IRepositryLayer
{
    public interface IFreelancerRL
    {
        public Task<bool> AddFreelancerInformation(Freelancer freelancer);
        public Task<Freelancer> findFreelancer(int freelancerid);
    }
}
