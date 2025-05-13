using skillhub.CommonLayer.Model.Users;

namespace skillhub.Interfaces.IServiceLayer
{
    public interface UserInterfaceSL
    {
        public Task<UserRegisterResponse> AddUserRegister(RegisterRequest request);
        public Task<string> AuthenticateUser(UserLogin userLogin);

        public Task<bool> CheckEmailExists(string email);

        public Task<bool> CheckUserNameExists(string userName);

        public Task<bool> AddPersonalInformation(PersonalInformationRequest personal_Information);
        public Task<User> findUser(int userid);
        
    }
}
