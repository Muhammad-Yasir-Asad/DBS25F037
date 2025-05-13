using skillhub.CommonLayer.Model.Blocked;

namespace skillhub.Interfaces.IRepositryLayer
{
    public interface IBlockedRL
    {
        public Task<bool> BlockUser(Blocked blocked);
        public Task<bool> unBlockUser(int blockerid, int blockeduserid);


    }
}
