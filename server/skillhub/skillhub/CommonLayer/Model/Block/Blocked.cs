namespace skillhub.CommonLayer.Model.Blocked
{
    public class Blocked
    {
        public int blockedId { get; private set; }
        public User blocker { get; private set; }
        public User blockedUser { get; private set; }
        public DateTime blockedDate { get; private set; }
        public string reason { get; private set; }
        public Blocked(int blockedId, User blocker, User blockedUser, DateTime blockedDate, string reason)
        {
            this.blockedId = blockedId;
            this.blocker = blocker;
            this.blockedUser = blockedUser;
            this.blockedDate = blockedDate;
            this.reason = reason;
        }
        public Blocked(User blocker, User blockedUser, string reason)
        {
            if (!Validate(reason))
            {
                throw new ArgumentException("Message text must be between 5 and 255 characters.");
            }
            this.blocker = blocker;
            this.blockedUser = blockedUser;
            this.reason = reason;
        }
        public static bool Validate(string str)
        {
            if (string.IsNullOrWhiteSpace(str) || str.Length < 5 || str.Length > 255)
            {
                return false;
            }
            return true;
        }
    }
}
