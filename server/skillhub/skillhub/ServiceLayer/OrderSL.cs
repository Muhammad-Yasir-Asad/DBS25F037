using skillhub.CommonLayer.Model.Freelancer;
using skillhub.CommonLayer.Model.Gig;
using skillhub.CommonLayer.Model.GigPackages;
using skillhub.CommonLayer.Model.Order;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;
using skillhub.RepositeryLayer;

namespace skillhub.ServiceLayer
{
    public class OrderSL : IOrderSL
    {
        public readonly IOrderRL orderInterface;
        public readonly UserInterfaceSL userInterface;
        public readonly IFreelancerSL freelancerInterface;
        public readonly IGigSL gigInterface;
        public readonly IGigPackageRL gigPackageSL;

        public OrderSL(IOrderRL orderInterface, UserInterfaceSL userInterface, IFreelancerSL freelancerInterface, IGigSL gigInterface, IGigPackageRL gigPackageSL)
        {
            this.orderInterface = orderInterface;
            this.userInterface = userInterface;
            this.freelancerInterface = freelancerInterface;
            this.gigInterface = gigInterface;
            this.gigPackageSL = gigPackageSL;
        }

        public Task<bool> deleteOrder(int orderId)
        {
            return orderInterface.deleteOrder(orderId);
        }

        public Task<Order> findOrder(int orderId)
        {
            return orderInterface.findOrder(orderId);

        }

        public async Task<bool> MakeOrder(OrderRequest request)
        {
            User client = await userInterface.findUser(request.clientId);
            Freelancer freelancer = await freelancerInterface.findFreelancer(request.freelancerId);
            Gig gig = await gigInterface.GetGig(request.gigId);
            GigPackage gigPackage = await gigPackageSL.GetGigPackage(request.gigpackageId);


            Order order = new Order(client, gig,gigPackage, freelancer, request.dueDate, request.coinAmount);

                return await orderInterface.MakeOrder(order);
            
        }

        public async Task<bool> updateOrder(int orderId, string status)
        {
            ;
            return await orderInterface.updateOrder(orderId, status);
        }
    }
}
