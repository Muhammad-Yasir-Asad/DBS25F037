using skillhub.CommonLayer.Model.Order;
using skillhub.CommonLayer.Model.Users;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface IOrderSL
    {
        public Task<bool> MakeOrder(OrderRequest request);
        public Task<Order> findOrder(int orderId);
        public Task<bool> updateOrder(int orderId, string status);
        public Task<bool> deleteOrder(int orderId);
    }
}
