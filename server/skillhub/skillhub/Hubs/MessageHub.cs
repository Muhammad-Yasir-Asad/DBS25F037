using Microsoft.AspNetCore.SignalR;

namespace skillhub.Hubs
{
    public class MessageHub : Hub
    {
        public async Task SendMessageToUser(int senderId, int receiverId, string messageText)
        {
            await Clients.User(receiverId.ToString()).SendAsync("ReceiveMessage", senderId, messageText);
        }
    }
}
