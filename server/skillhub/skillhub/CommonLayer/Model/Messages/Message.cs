namespace skillhub.CommonLayer.Model.Messages
{
    public class Message
    {
        public int messageId { get; private set; }
        public int senderId { get; private set; }
        public int receiverId { get; private set; }
        public string messageText { get; private set; }
        public DateTime sentTime { get; private set; }
        public bool isRead { get; private set; }

        public Message(int senderId, int receiverId, string messageText)
        {
            if (!Validate(messageText) && senderId != receiverId)
            {
                throw new ArgumentException("Message text must be between 5 and 255 characters.");
            }

            this.senderId = senderId;
            this.receiverId = receiverId;
            this.messageText = messageText;
            this.isRead = false;
        }
        public Message(int messageid, int senderid, int receiverId, string messageText, DateTime sentTime, bool isRead)
        {
            this.messageId = messageid;
            this.senderId = senderid;
            this.receiverId = receiverId;
            this.messageText = messageText;
            this.sentTime = sentTime;
            this.isRead = isRead;

        }
        public static bool Validate(string messageText)
        {
            if (string.IsNullOrWhiteSpace(messageText) || messageText.Length < 5 || messageText.Length > 255)
            {
                return false;
            }
            return true;
        }
    }
}
