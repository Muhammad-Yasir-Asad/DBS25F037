using skillhub.CommonLayer.Model.Users;

namespace skillhub.Interfaces.IRepositryLayer
{
    public interface UserInterfaceRL
    {
        public Task<UserRegisterResponse> RegisterUser(User newUser);

        public Task<string> AuthenticateUser(User authUser);

        public Task<bool> CheckEmailExists(string email);

        public Task<bool> CheckUserNameExists(string userName);

        public Task<bool> AddPersonalInformation(User user);
        public Task<User> findUser(int userid);
    }
}
