using MCN.Common.AttribParam;
using MCN.ServiceRep.BAL.ServicesRepositoryBL.AppointmentRepositoryBLs.Dtos;
using MCN.ServiceRep.BAL.ServicesRepositoryBL.UserRepositoryBL.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MCN.ServiceRep.BAL.ServicesRepositoryBL.UserRepositoryBL
{
    public interface IUserRepositoryBL
    {
        SwallResponseWrapper IsValidUserEmail(string email, string Url, string RoleType);
        SwallResponseWrapper IsValidPassword(string Password, string Email, string IpAddress);
        //SwallResponseWrapper IsValidAdminPassword(string Password, string Email);
        SwallResponseWrapper IsValidEmailPasscode(string Passcode, string IpAddress, string Email); 
        //SwallResponseWrapper ResetPassword(ChangePasswordDTO resetPassword);
        SwallResponseWrapper IsEmailVerified(string Passcode, string IpAddress, string Email);
        SwallResponseWrapper CreateUser(CreateUserDto dto);

        SwallResponseWrapper AddBook(BookDto dto);
        SwallResponseWrapper RegisterSalon(SalonDto dto);
        SwallResponseWrapper OrderBook(OrderDto dto);
        SwallResponseWrapper OrderAction(OrderActionDto dto);
        SwallResponseWrapper RequestBook(RequestDto dto);
        SwallResponseWrapper AddLibraryBook(LibraryDto dto);
        SwallResponseWrapper GetBook(int id);
        SwallResponseWrapper GetUserOrders(int id);
        SwallResponseWrapper GetBookRequests(int id);
        SwallResponseWrapper GetUserRequests(int id);
        SwallResponseWrapper GetSellerOrders(int id);
        SwallResponseWrapper CancelRequest(int id);
        SwallResponseWrapper RequestAccepted(AcceptRequest dto);
        SwallResponseWrapper GetLibBooks(int id);
        string FileUpload(FileDto dto);

        string SalonLogo(FileDto dto);
        SwallResponseWrapper GetProfileImg(int id);

        SwallResponseWrapper Salon(int id);
        SwallResponseWrapper GetSalon(int id);

        SwallResponseWrapper GetBarbers(int id);

        SwallResponseWrapper GetBooks(int id);
        SwallResponseWrapper SearchBarbers(int id);
        SwallResponseWrapper AddToWishlist(WishDto dto);
        SwallResponseWrapper Feedback(FeedDto dto);
        SwallResponseWrapper GetWishBooks(int id);
        int GetSalonID(int id);

        string RemoveBarber(int id);
        string RemoveBook(int id);

        string RemoveLibraryBook(int id);
        //SwallResponseWrapper PasswordChange(PasswordChangeDto passwordChangeDto);
        SwallResponseWrapper ReGenerateEmailVerificationPasscode(CreateUserDto userDto, string IpAddress);
        // Result<UserDto> Users(UserCriteria criteria);
        //User GetUser(int userID); 


        SwallResponseWrapper GetAllBooks(SearchDoctorFilterDto search);
    }
}
