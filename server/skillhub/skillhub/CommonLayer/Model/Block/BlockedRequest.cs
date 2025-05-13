namespace skillhub.CommonLayer.Model.Blocked
{
    public class BlockedRequest
    {
        public int blockerId { get; set; }
        public int blockedUserId { get; set; }
        public string reason { get; set; }
    }
}
