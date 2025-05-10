using skillhub.CommonLayer.Model.Messages;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IMessageSL
    {
        public Task<bool> SendMessage(MessageRequest request);
    }
}
