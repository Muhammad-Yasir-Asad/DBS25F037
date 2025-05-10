using skillhub.CommonLayer.Model.Messages;
using skillhub.CommonLayer.Model.Users;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class WalletSL:IWalletSL
    {
        public readonly IWalletRL walletInterface;
        public WalletSL(IWalletRL walletInterface)
        {
            this.walletInterface = walletInterface;
        }

        public Task<bool> MakeWallet(WalletRequest request)
        {
            Wallet wallet = new Wallet(request.userID);
            return walletInterface.MakeWallet(wallet);
        }
    }
}
