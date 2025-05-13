using skillhub.CommonLayer.Model.Blocked;
using skillhub.CommonLayer.Model.Freelancer;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IBlockedSL
    {
        public Task<bool> BlockUser(BlockedRequest blocked);
        public Task<bool> unBlockUser(int blockerid, int blockeduserid);

    }
}
