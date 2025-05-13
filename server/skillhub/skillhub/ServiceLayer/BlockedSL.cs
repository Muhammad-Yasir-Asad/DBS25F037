using Azure.Core;
using skillhub.CommonLayer.Model.Blocked;
using skillhub.CommonLayer.Model.Freelancer;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class BlockedSL : IBlockedSL
    {
        public readonly IBlockedRL blockedinterface;
        public readonly UserInterfaceSL userinterface;

        public BlockedSL(IBlockedRL blockedinterface, UserInterfaceSL userInterface)
        {
            this.blockedinterface = blockedinterface;
            this.userinterface = userInterface;
        }

        public async Task<bool> BlockUser(BlockedRequest request)
        {
            User blocker = await userinterface.findUser(request.blockerId);
            User blocked = await userinterface.findUser(request.blockedUserId);
            Blocked blockeduser = new Blocked(blocker, blocked, request.reason);
            return await blockedinterface.BlockUser(blockeduser);
        }

        public async Task<bool> unBlockUser(int blockerid, int blockeduserid)
        {
            return await blockedinterface.unBlockUser(blockerid, blockeduserid);
        }
    }
}
