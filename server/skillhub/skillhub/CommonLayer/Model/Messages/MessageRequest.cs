namespace skillhub.CommonLayer.Model.Messages
{
    public class MessageRequest
    {
        public int senderId { get; set; }
        public int receiverId { get; set; }
        public string messageText { get; set; }
        public DateTime sentTime { get; set; }
        public bool isRead { get; set; }

    }
}
