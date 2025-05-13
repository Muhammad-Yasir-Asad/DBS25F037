using skillhub.CommonLayer.Model.Users;

namespace skillhub.CommonLayer.Model.Freelancer
{
    public class Freelancer : User
    {
        public int freelancerID { get; private set; }

        public int userID { get; private set; }

        public string gender { get; private set; }

        public string education { get; private set; }

        public string language { get; private set; }
        public int ExperienceYears { get; private set; }
        public float rating { get; private set; }
        public int totalCompletedOrders { get; private set; }
        public bool availabilityStatus { get; private set; }

        public Freelancer(int userID, string gender, string education, string languaage)
        {
            this.userID = userID;
            this.gender = gender;
            this.education = education;
            this.language = languaage;
        }
        public Freelancer(string gender, string education, string languaage)
        {
            this.gender = gender;
            this.education = education;
            this.language = languaage;
        }
        public Freelancer(int freelancerID, int ExperienceYears, float rating, int totalCompletedOrders, bool availabilityStatus, string gender, string education, string language, User user) : base(user)
        {
            this.freelancerID = freelancerID;
            this.ExperienceYears = ExperienceYears;
            this.rating = rating;
            this.totalCompletedOrders = totalCompletedOrders;
            this.availabilityStatus = availabilityStatus;
            this.gender = gender;
            this.education = education;
            this.language = language;
        }

    }
}
