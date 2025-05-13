using System.Text.RegularExpressions;
using Azure;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using skillhub.CommonLayer.Model.Users;
using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;

namespace skillhub.ServiceLayer
{
    public class UserSL : UserInterfaceSL
    {
        public readonly UserInterfaceRL userInterface;
        private readonly IWebHostEnvironment environment;
        public UserSL(UserInterfaceRL userInterface, IWebHostEnvironment environment)
        {
            this.userInterface = userInterface;
            this.environment = environment;
        }

        public async Task<UserRegisterResponse> AddUserRegister(RegisterRequest request)
        {
            UserRegisterResponse response = new UserRegisterResponse();

            
           
            if (string.IsNullOrWhiteSpace(request.email))
            {
                response.isSuccess = false;
                response.message = "Email can't be empty";
                return response;
            }
            else if (!Regex.IsMatch(request.email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                response.isSuccess = false;
                response.message = "Invalid email format";
                return response;
            }
            if (string.IsNullOrWhiteSpace(request.passwordHash))
            {
                response.isSuccess = false;
                response.message = "Password can't be empty";
            }
            if(request.passwordHash.Length < 8)
            {
                response.isSuccess = false;
                response.message = "Password must be at least 8 characters long";
                return response;
            }
            else if (!Regex.IsMatch(request.passwordHash, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"))
            {
                response.isSuccess = false;     
                response.message = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
                return response;
            }

            User newUser = new User(request.userName, request.email, request.passwordHash, request.roleID);

            try
            {
                return await userInterface.RegisterUser(newUser);
            }
            catch (Exception ex) {
                response.isSuccess = false;
                response.message = ex.Message;
            }
            return response;
        }
        public async Task<string> AuthenticateUser(UserLogin userLogin)
        {
            User authUser = new User(userLogin.email, userLogin.password);
            return await userInterface.AuthenticateUser(authUser);
        }

        public Task<bool> CheckEmailExists(string email)
        {
            return userInterface.CheckEmailExists(email);
        }
        public Task<bool> CheckUserNameExists(string userName)
        {
            return userInterface.CheckUserNameExists(userName);
        }


         async Task<bool> UserInterfaceSL.AddPersonalInformation(PersonalInformationRequest personalInformation)
        {
            if (string.IsNullOrWhiteSpace(personalInformation.FirstName) ||
               string.IsNullOrWhiteSpace(personalInformation.LastName) ||
               string.IsNullOrWhiteSpace(personalInformation.Phone) || personalInformation.Phone.Length != 11 ||
               string.IsNullOrWhiteSpace(personalInformation.Country) ||
               personalInformation.ProfilePicture == null ||
               string.IsNullOrWhiteSpace(personalInformation.Bio))
            {
                return false;
            }

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(personalInformation.ProfilePicture.FileName);
            string imagePath = Path.Combine("Images", fileName);

            string webRootPath = environment.WebRootPath;

            if (string.IsNullOrEmpty(webRootPath))
            {
                throw new InvalidOperationException("WebRootPath is not set.");
            }

            Console.WriteLine($"WebRootPath: {webRootPath}");


            string fullPath = Path.Combine(webRootPath, imagePath);

            Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await personalInformation.ProfilePicture.CopyToAsync(stream);
            }

            User personal_Information = new User(
                personalInformation.UserID,
                personalInformation.FirstName,
                personalInformation.LastName,
                personalInformation.Phone,
                personalInformation.Country,
                imagePath,
                personalInformation.Bio
            );

            return await userInterface.AddPersonalInformation(personal_Information);

        }
        public Task<User> findUser(int userid)
        {
            return userInterface.findUser(userid);
        }
    }
}
