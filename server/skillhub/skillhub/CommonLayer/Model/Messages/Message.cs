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

        public Message(int senderid, int receiverId, string messageText)
        {
            this.senderId = senderid;
            this.receiverId = receiverId;
            this.messageText = messageText;
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
    }
}
