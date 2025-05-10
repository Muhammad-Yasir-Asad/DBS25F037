using System.ComponentModel.DataAnnotations;
using skillhub.CommonLayer.Model.Users;

public class User
{
    public int userID { get; private set; }

    public string firstName { get; private set; }
    public string lastName { get; private set; }
    public string email { get; private set; }
    public string passwordHash { get; private set; }
    public string profilePicture { get; private set; }
    public bool isActive { get; private set; }
    public int roleID { get; private set; }
    public string current_mode { get; private set; }
    public string joinDate { get; private set; }
    public string bio { get; private set; }
    public string phone { get; private set; }
    public string country { get; private set; }
    public Wallet Wallet { get; private set; }
    public string language { get; private set; }
    public string userName { get; private set; }



    public User(string userName, string email, string passwordHash, int roleID)
    {
        this.userName = userName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.roleID = roleID;
        this.isActive = true;
        this.joinDate = DateTime.UtcNow.ToString("yyyy-MM-dd");
        this.current_mode = "Default";
        this.Wallet = new Wallet(this.userID);
    }
    public User()
    {

    }
    public User(string email, string passwordHash)
    {
        this.email = email; 
        this.passwordHash = passwordHash;
    }

    public User(int userID, string firstName, string lastName, string phone, string country , string profilePicture, string bio, string language)
    {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.country = country;
        this.profilePicture = profilePicture;
        this.bio = bio;
        this.language = language;
    }
}