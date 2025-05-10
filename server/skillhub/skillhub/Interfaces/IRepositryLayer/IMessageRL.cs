using skillhub.CommonLayer.Model.Messages;

namespace skillhub.Interfaces.IRepositryLayer
{
    public interface IMessageRL
    {
        public Task<bool> SendMessage(Message message);
    }
}
