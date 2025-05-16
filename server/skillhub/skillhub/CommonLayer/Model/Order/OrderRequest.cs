
namespace skillhub.CommonLayer.Model.Order
{
    public class OrderRequest
    {
        public int clientId { get;  set; }
        public int gigId { get;  set; }
        public int gigpackageId { get;  set; }
        public int freelancerId { get;  set; }
        public DateTime dueDate { get;  set; }
        public float coinAmount { get;  set; }
    }
}
