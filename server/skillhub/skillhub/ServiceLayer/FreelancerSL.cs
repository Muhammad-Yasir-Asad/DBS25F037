using skillhub.CommonLayer.Model.Freelancer;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class FreelancerSL : IFreelancerSL
    {
        public readonly IFreelancerRL freelancer;

        public FreelancerSL(IFreelancerRL freelancer)
        {
            this.freelancer = freelancer;
        }

        public Task<bool> AddFreelancerInformation(FreelancerRequest freelancerRequest)
        {
            Freelancer freelancerInformation = new Freelancer(freelancerRequest.userID ,freelancerRequest.gender, freelancerRequest.education, freelancerRequest.language);

            return freelancer.AddFreelancerInformation(freelancerInformation);
        }
        public Task<Freelancer> findFreelancer(int freelancerid)
        {
            return freelancer.findFreelancer(freelancerid);
        }
    }
}
