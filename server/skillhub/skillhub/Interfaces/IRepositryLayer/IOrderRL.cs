

using skillhub.CommonLayer.Model.Order;

namespace skillhub.Interfaces.IRepositryLayer
{
    public interface IOrderRL
    {
        public Task<bool> MakeOrder(Order request);
        public Task<Order> findOrder(int orderId);
        public Task<bool> updateOrder(int orderId, string status);
        public Task<bool> deleteOrder(int orderId);

    }
}
