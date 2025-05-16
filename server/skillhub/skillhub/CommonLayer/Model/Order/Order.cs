using skillhub.CommonLayer.Model.Freelancer;
using skillhub.CommonLayer.Model.Gig;
using skillhub.CommonLayer.Model.GigPackages;
namespace skillhub.CommonLayer.Model.Order
{
    public class Order
    {
        public int orderId { get; private set; }
        public User client { get; private set; }
        public Gig.Gig gig { get; private set; }
        public Freelancer.Freelancer freelancer { get; private set; }
        public DateTime orderDate { get; private set; }
        public DateTime dueDate { get; private set; }
        public string status { get; private set; }
        public float coinAmount { get; private set; }
        public GigPackage gigPackage { get; private set; }

        public DateTime? completionDate { get; private set; }

        public Order(int orderId, User client, Gig.Gig gig,GigPackage gigPackage, Freelancer.Freelancer freelancer, DateTime orderDate, DateTime dueDate, string status, float coinAmount, DateTime?
            completionDate)
        {
            this.orderId = orderId;
            this.client = client;
            this.gig = gig;
            this.gigPackage = gigPackage;
            this.freelancer = freelancer;
            this.orderDate = orderDate;
            this.dueDate = dueDate;
            this.status = status;
            this.coinAmount = coinAmount;
            this.completionDate = completionDate;
        }
        public Order(User client, Gig.Gig gig,GigPackage gigPackage, Freelancer.Freelancer freelancer, DateTime dueDate, float coinAmount)
        {
            this.client = client;
            this.gig = gig;
            this.gigPackage = gigPackage;
            this.freelancer = freelancer;
            this.dueDate = dueDate;
            this.coinAmount = coinAmount;
            this.status = "In progress";
        }

       
       

    }
}
