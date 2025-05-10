namespace skillhub.CommonLayer.Model.Users
{
    public class Wallet
    {
        public int walletID { get; private set; }
        public int userID { get; private set; }
        public float coinbalance { get; private set; }
        public DateTime lastUpdated { get; private set; }
        public string status { get; private set; }

        public Wallet(int walletid,int userID, float coinbalance, DateTime lastupdate, string status)
        {

            this.walletID = walletid;
            this.userID = userID;
            this.coinbalance = coinbalance;
            this.lastUpdated = lastupdate;
            this.status = status;
        }
        public Wallet(int userID)
        {
            this.userID=userID;
            this.coinbalance = 0;
            status = "active";
        }
    }
}
