using System.ComponentModel.DataAnnotations;
using skillhub.CommonLayer.Model.Messages;
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
    public string userName { get; private set; }

    public List<Message> sentMEssages { get; private set; }
    public List<Message> receivedMessage { get; private set; }

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
    public User(User user)
    {
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.passwordHash = user.passwordHash;
        this.profilePicture = user.profilePicture;
        this.roleID = user.roleID;
        this.joinDate = user.joinDate;
        this.bio = user.bio;
        this.phone = user.phone;
        this.country = user.country;
        this.userName = user.userName;


    }
    public User()
    {

    }
    public User(string email, string passwordHash)
    {
        this.email = email; 
        this.passwordHash = passwordHash;
    }

    public User(int userID, string firstName, string lastName, string phone, string country , string profilePicture, string bio)
    {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.country = country;
        this.profilePicture = profilePicture;
        this.bio = bio;
    }
    public User(int userID, string firstName, string lastName, string email, string passwordHash, string profilePicture, int roleID, string joinDate, string bio, string phone, string username, string country)
    {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.profilePicture = profilePicture;
        this.roleID = roleID;
        this.joinDate = joinDate;
        this.bio = bio;
        this.phone = phone;
        this.country = country;
        this.userName = username;
    }
    

    

    
}