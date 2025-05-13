namespace skillhub.CommonLayer.Model.Users
{
    public class PersonalInformation
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string Bio { get; set; }
        public string Language { get; set; }
        public IFormFile ProfilePicture { get; set; }
       
    }

    
}
