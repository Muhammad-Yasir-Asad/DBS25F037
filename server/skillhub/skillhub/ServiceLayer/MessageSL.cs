using skillhub.CommonLayer.Model.Freelancer;
using skillhub.CommonLayer.Model.Messages;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.RepositeryLayer
{
    public class MessageSL : IMessageSL
    {
        public readonly IMessageRL messageInterface;
        public MessageSL(IMessageRL messageInterface)
        {
            this.messageInterface = messageInterface;
        }

        public Task<bool> SendMessage(MessageRequest request)
        {
                Message message = new Message(request.senderId, request.receiverId, request.messageText);
            return messageInterface.SendMessage(message);
        }

    }
}
