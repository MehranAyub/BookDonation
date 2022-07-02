using MCN.Common;
using MCN.Common.AttribParam;
using MCN.Common.Exceptions;
using MCN.Core.Entities.Entities;
using MCN.ServiceRep.BAL.ContextModel;
using MCN.ServiceRep.BAL.ServicesRepositoryBL.AppointmentRepositoryBLs.Dtos;
using MCN.ServiceRep.BAL.ServicesRepositoryBL.UserRepositoryBL.Dtos;
using MCN.ServiceRep.BAL.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using static MCN.Common.AttribParam.SwallTextData;

namespace MCN.ServiceRep.BAL.ServicesRepositoryBL.UserRepositoryBL
{
    public class UserRepositoryBL : BaseRepository, IUserRepositoryBL
    {
        private readonly SwallResponseWrapper _swallResponseWrapper;
        private readonly SwallText _swallText;
        public static int DEFAULT_USERID = 1;

        public UserRepositoryBL(RepositoryContext repository) : base(repository)
        {
            _swallResponseWrapper = new SwallResponseWrapper();
            _swallText = new SwallText();
            repositoryContext = repository;
        }


        public SwallResponseWrapper IsValidUserEmail(string email, string Url, string RoleType)
        {
            var usr = new User();

            var IsValidEmail = repositoryContext.Users.FirstOrDefault(x => x.Email == email);
            if (IsValidEmail != null && IsValidEmail.IsEmailVerified == true)
            {
                return new SwallResponseWrapper()
                {
                    SwallText = new LoginUser().SwallTextEmailVerifiedSuccess,
                    StatusCode = 200,
                    Data = null
                };
            }
            else if (IsValidEmail != null && IsValidEmail.IsEmailVerified == false)
            {
                return new SwallResponseWrapper()
                {
                    SwallText = new LoginUser().SwallTextEmailVerifiedFailure,
                    StatusCode = 401,
                    Data = usr
                };
            }
            else
            {
                return new SwallResponseWrapper()
                {
                    SwallText = LoginUser.EmailVerifcationInvalidUser,
                    StatusCode = 404,
                    Data = usr
                };
            }
        }



        public SwallResponseWrapper ReGenerateEmailVerificationPasscode(CreateUserDto userDto, string IpAddress)
        {
            var context = repositoryContext;

            var usr = context.Users.AsNoTracking().FirstOrDefault(x => x.Email == userDto.Email);
            if (usr == null)
            {
                CreateUserDto createUserDto = new CreateUserDto() { Email = userDto.Email };
                var response = CreateUser(createUserDto);
                if (response.StatusCode == 200)
                {
                    return new SwallResponseWrapper()
                    {
                        SwallText = LoginUser.EmailVerifcationInvalidUser,
                        StatusCode = 1,
                        Data = null
                    };

                }

            }
            else if (usr.Email != null && usr.Password == null)
            {
                var passcode = RandomHelper.GetRandomNumber().ToString("x");
                SavePasscode(passcode, IpAddress, usr.ID);
                return new SwallResponseWrapper()
                {
                    SwallText = LoginUser.EmailVerifcationInvalidUser,
                    StatusCode = 1,
                    Data = usr
                };
            }
            else if (usr.Email != null && usr.Password != null)
            {

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 2,
                    Data = usr
                };

            }


            //var passcode = RandomHelper.GetRandomNumber().ToString("x");
            //SavePasscode(passcode, IpAddress, usr.ID);

            //return new SwallResponseWrapper()
            //{
            //    SwallText =Auth.ValidateEmail,
            //    StatusCode = 200,
            //    Data = usr
            //};
            //_emailrepo.SendEmailVerificationPasscode(
            //    new EmailVerificationEmailDTO
            //    {
            //        BaseURI = BaseURL,
            //        Email = email,   
            //        Passcode = passcode,
            //        UserId = usr.ID,
            //        //UserName = usr.UserName
            //    }
            //    );
            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 0,
                Data = null
            };
        }

        public SwallResponseWrapper CreateUser(CreateUserDto dto)
        {
            User usr = new User
            {
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                CreatedBy = DEFAULT_USERID,
                Email = dto.Email,
                Address = dto.Address,
                FirstName = dto.FirstName,
                IsActive = true,
                LastName = dto.LastName,
                LoginFailureCount = 0,
                Password = dto.Password,
                UpdatedBy = DEFAULT_USERID,
                IsEmailVerified = false,
                Phone = dto.Phone,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                UserLoginTypeId = dto.LoginType,
                Description = dto.Description,
                SalonId = dto.SalonId
            };


            repositoryContext.Users.Add(usr);
            repositoryContext.SaveChanges();
            var passcode = RandomHelper.GetRandomNumber().ToString("x");
            SavePasscode(passcode, dto.IpAddress, usr.ID);
            //_emailrepo.SendEmailVerificationPasscode(
            //    new EmailVerificationEmailDTO
            //    {
            //        BaseURI = dto.BaseURL,
            //        Email = dto.Email,
            //        FormId = form.FormId,
            //        FormName = form.FormName,
            //        FormSupportEmail = form.FormSupportEmail,
            //        Passcode = passcode,
            //        UserId = usr.UserID,
            //        //UserName = usr.UserName,
            //        FormURL = form.FormUrl
            //    }
            //    );

            return new SwallResponseWrapper()
            {
                SwallText = LoginUser.UserCreatedScuccessfully,
                StatusCode = 200,
                Data = usr
            };
        }


        public SwallResponseWrapper AddBook(BookDto dto)
        {
            Book book = new Book
            {

                CreatedBy = dto.CreatedBy,
                Title = dto.Title,
                Isbn = dto.Isbn,
                Price = dto.Price,
                CopiesInStock = dto.Copies,
                AuthorName = dto.AuthName,
                PublisherName = dto.PubName,
                StoreId = dto.StoreId,

            };


            repositoryContext.Book.Add(book);
            repositoryContext.SaveChanges();
            //_emailrepo.SendEmailVerificationPasscode(
            //    new EmailVerificationEmailDTO
            //    {
            //        BaseURI = dto.BaseURL,
            //        Email = dto.Email,
            //        FormId = form.FormId,
            //        FormName = form.FormName,
            //        FormSupportEmail = form.FormSupportEmail,
            //        Passcode = passcode,
            //        UserId = usr.UserID,
            //        //UserName = usr.UserName,
            //        FormURL = form.FormUrl
            //    }
            //    );

            return new SwallResponseWrapper()
            {
                SwallText = LoginUser.UserCreatedScuccessfully,
                StatusCode = 200,
                Data = book
            };
        }
        //public SwallResponseWrapper ResetPassword(ChangePasswordDTO resetPassword)
        //{
        //    var token = repositoryContext.UserAuthtoken.Where(x => x.Authtoken == resetPassword.Token && x.AccessIP == resetPassword.IpAddress).OrderByDescending(x => x.CreatedOn).FirstOrDefault();

        //    if (token.CreatedOn?.AddHours(24) < DateTime.Now)
        //    {
        //        _swallText.html = LoginSwallMessagesHtml.ResetPasswordTokenExpireHtmlFailure;
        //        _swallText.title = LoginSwallMessagesHtml.ResetPasswordTokenExpireTitleFailure;
        //        _swallText.type = SwalType.Error;
        //        throw new UserThrownException(_swallText);
        //    }

        //    var user = repositoryContext.Users.Where(x => x.ID == token.UserID).FirstOrDefault();
        //    if (user != null && user.Email == resetPassword.Email)
        //    {
        //        user.Password = resetPassword.Password;
        //        repositoryContext.Update(user);
        //        repositoryContext.SaveChanges();
        //        _swallText.html = LoginSwallMessagesHtml.ResetPasswordChangedHtmlSuccess;
        //        _swallText.title = LoginSwallMessagesHtml.ResetPasswordChangedTitleFailure;
        //        _swallText.type = SwalType.Success;
        //        _swallResponseWrapper.SwallText = _swallText;
        //        _swallResponseWrapper.StatusCode = 200;
        //        _swallResponseWrapper.Data = null;
        //        return _swallResponseWrapper;
        //    }
        //    else
        //    {
        //        _swallText.html = LoginSwallMessagesHtml.ResetPasswordInvUserHtmlFailure;
        //        _swallText.title = LoginSwallMessagesHtml.ResetPasswordInvUserTitleFailure;
        //        _swallText.type = SwalType.Error;
        //        throw new UserThrownException(_swallText);
        //    }

        //}

        public SwallResponseWrapper IsEmailVerified(string Passcode, string IpAddress, string Email)
        {
            var result = checkPasscode(Passcode, IpAddress, Email);

            if (result != null)
            {
                var user = repositoryContext.Users.FirstOrDefault(x => x.Email == Email);
                user.IsEmailVerified = true;
                repositoryContext.Entry(user).State = EntityState.Modified;
                repositoryContext.SaveChanges();

                return new SwallResponseWrapper()
                {
                    StatusCode = 200,
                    SwallText = new LoginUser().SwallTextEmailPasscodeVerifiedSuccess
                    ,
                    Data = repositoryContext.Users
                    .Where(x => x.ID == result.UserID).FirstOrDefault()
                };
            }
            else
                return null;
        }

        public SwallResponseWrapper IsValidEmailPasscode(string Passcode, string IpAddress, string Email)
        {
            var result = checkPasscode(Passcode, IpAddress, Email);

            return result != null ?
                new SwallResponseWrapper()
                {
                    StatusCode = 200,
                    SwallText = new LoginUser().SwallTextEmailPasscodeVerifiedSuccess,
                    Data = repositoryContext.Users
                    .Where(x => x.ID == result.UserID).FirstOrDefault()
                }
                :
                 null;
        }


        public string FileUpload(FileDto dto)
        {
            var record = repositoryContext.Files.FirstOrDefault(x => x.UserId == dto.UserId);

            if (record == null)
            {
                var img = "";
                var obj = new Files();
                obj.DocumentId = dto.DocumentId;
                obj.FileType = dto.FileType;
                obj.DataFiles = dto.DataFiles;
                obj.Name = dto.Name;
                obj.CreatedOn = dto.CreatedOn;
                obj.UserId = dto.UserId;
                repositoryContext.Files.Add(obj);
            }

            else
            {
                record.DataFiles = dto.DataFiles;
                repositoryContext.Update(record);
            }
            repositoryContext.SaveChanges();


            var image = "data:image/png;base64," + Convert.ToBase64String(dto.DataFiles);
            try
            {

                return image;
                //return new SwallResponseWrapper()
                //{
                //    SwallText = null,
                //    StatusCode = 200,
                //    Data = image
                //};
            }
            catch (Exception ex)
            {
                return "error";
                //return new SwallResponseWrapper()
                //{
                //    SwallText = null,
                //    StatusCode = 404,
                //    Data = ex
                //};
            }

        }


        public string SalonLogo(FileDto dto)
        {
            var record = repositoryContext.Salon.FirstOrDefault(x => x.RegisterBy == dto.UserId);

            if (record == null)
            {

                return "null";
            }

            else
            {
                var image = "data:image/png;base64," + Convert.ToBase64String(dto.DataFiles);

                record.SalonLogo = image;
                repositoryContext.Update(record);
                repositoryContext.SaveChanges();
                return image;
            }


        }

        public UserMultiFactor checkPasscode(string Passcode, string IpAddress, string Email)
        {
            var user = repositoryContext.Users.FirstOrDefault(x => x.Email == Email);

            if (user != null)
            {
                var passcodeSuccess = repositoryContext.UserMultiFactors.OrderByDescending(x => x.CreatedOn).FirstOrDefault(x => x.AccessIP == IpAddress && x.UserID == user.ID);

                if (passcodeSuccess?.EmailToken == Passcode)
                {
                    user.IsEmailVerified = true;
                    repositoryContext.Entry(user).State = EntityState.Modified;
                    repositoryContext.SaveChanges();

                    return passcodeSuccess;
                }
                else
                {
                    //throw new UserThrownBadRequest(new LoginUser().SwallTextEmailPasscodeFailure, null);
                    return null;
                }

            }
            else
            {
                // throw new UserThrownBadRequest(new LoginUser().SwallTextEmailPasscodeFailure, null);
                return null;
            }
        }

        public SwallResponseWrapper IsValidPassword(string Password,
            string Email, string IpAddress)
        {
            // var user = GetUserByUrlEmail(Email, Url);

            var user = (from u in repositoryContext.Users
                        where u.Email.ToLower() == Email.ToLower() && u.Password == Password && u.IsEmailVerified == true
                        select u).FirstOrDefault();

            if (user == null)
            {
                return new SwallResponseWrapper()
                {
                    Data = null,
                    StatusCode = 404,
                    SwallText = new LoginUser().SwallTextEmailVerifiedFailure
                };

            }
            return new SwallResponseWrapper()
            {
                Data = user,
                StatusCode = 200,
                SwallText = new LoginUser().SwallTextPasswordVerifiedSuccess
            };
        }


        private void SavePasscode(string Passcode, string IpAddress, int userId)
        {

            var obj = new UserMultiFactor();
            obj.AccessIP = IpAddress;
            obj.CreatedOn = DateTime.Now;
            obj.EmailToken = Passcode;
            obj.UpdatedOn = DateTime.Now;
            obj.UserID = userId;
            //obj.UserMultiFactorKey = _autoCodeNumberRepositoryBL.GetAutoCodeNumber(nameof(UserMultiFactor));
            ///////////////////////////////////            
            repositoryContext.UserMultiFactors.Add(obj);
            repositoryContext.SaveChanges();
        }

        //public SwallResponseWrapper PasswordChange(PasswordChangeDto passwordChangeDto)
        //{
        //    var user = repositoryContext.User.FirstOrDefault(x => x.Email == passwordChangeDto.Email);
        //    if (user != null)
        //    {
        //        if (user.Password != passwordChangeDto.OldPassword)
        //        {
        //            _swallText.html = LoginSwallMessagesHtml.OldPasswordNotCorrect;
        //            _swallText.title = LoginSwallMessagesHtml.ChangePasswordFail;
        //            _swallText.type = SwalType.Error;
        //            throw new UserThrownException(_swallText);
        //        }
        //        user.Password = passwordChangeDto.Password;
        //        repositoryContext.User.Update(user);
        //        repositoryContext.SaveChanges();

        //        _swallText.html = LoginSwallMessagesHtml.ResetPasswordChangedHtmlSuccess;
        //        _swallText.title = LoginSwallMessagesHtml.ResetPasswordChangedTitleFailure;
        //        _swallText.type = SwalType.Success;
        //        _swallResponseWrapper.SwallText = _swallText;
        //        _swallResponseWrapper.StatusCode = 200;
        //        _swallResponseWrapper.Data = null;
        //        return _swallResponseWrapper;
        //    }
        //    else
        //    {
        //        _swallText.html = LoginSwallMessagesHtml.ResetPasswordInvUserHtmlFailure;
        //        _swallText.title = LoginSwallMessagesHtml.ResetPasswordInvUserTitleFailure;
        //        _swallText.type = SwalType.Error;
        //        throw new UserThrownException(_swallText);
        //    }

        //}


        public User GetUser(int userID)
        {
            var user = repositoryContext.Users.FirstOrDefault(x => x.ID == userID && x.UserLoginTypeId == UserEntityType.Doctor);

            return user;
        }

        public SwallResponseWrapper GetProfileImg(int userID)
        {
            var user = repositoryContext.Files.FirstOrDefault(x => x.UserId == userID);


            if (user == null)
            {

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 200,
                    Data = null
                };
            }
            else
            {
                var image = "data:image/png;base64," + Convert.ToBase64String(user.DataFiles);
                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 404,
                    Data = image
                };
            }

        }

        public SwallResponseWrapper RegisterSalon(SalonDto dto)
        {
            var record = repositoryContext.Salon.FirstOrDefault(x => x.RegisterBy == dto.RegisterBy);
            var user = repositoryContext.Users.FirstOrDefault(x => x.ID == dto.RegisterBy);
            if (record == null)
            {
                Salon salon = new Salon
                {
                    Name = dto.Name,
                    RegisterBy = dto.RegisterBy,
                    Address = dto.Address,
                    Introduction = dto.Introduction,
                    About = dto.About
                };

                repositoryContext.Add(salon);

            }
            else
            {

                record.Name = dto.Name;
                record.RegisterBy = dto.RegisterBy;
                record.Address = dto.Address;
                record.Introduction = dto.Introduction;
                record.About = dto.About;
                repositoryContext.Update(record);
            }

            repositoryContext.SaveChanges();
            record = repositoryContext.Salon.FirstOrDefault(x => x.RegisterBy == dto.RegisterBy);
            user.SalonId = record.ID;
            repositoryContext.Update(record);
            repositoryContext.SaveChanges();


            return new SwallResponseWrapper()
            {
                SwallText = LoginUser.UserCreatedScuccessfully,
                StatusCode = 200,
                Data = dto
            };
        }


        public SwallResponseWrapper GetSalon(int userID)
        {
            var user = repositoryContext.Salon.FirstOrDefault(x => x.RegisterBy == userID);


            if (user == null)
            {

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 404,
                    Data = null
                };
            }
            else
            {
                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 200,
                    Data = user
                };
            }

        }

        public SwallResponseWrapper Salon(int id)
        {
            var user = repositoryContext.Salon.FirstOrDefault(x => x.ID == id);


            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 200,
                Data = user
            };


        }
        public SwallResponseWrapper GetBarbers(int SalonId)
        {
            var user = repositoryContext.Users.Where(x => x.SalonId == SalonId && x.Description != null).ToList();


            if (user == null)
            {

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 404,
                    Data = null
                };
            }
            else
            {
                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 200,
                    Data = user
                };
            }

        }

        public SwallResponseWrapper GetBooks(int OwnerId)
        {
            var user = repositoryContext.Book.Where(x => x.CreatedBy == OwnerId).ToList();

            if (user == null)
            {

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 404,
                    Data = null
                };
            }
            else
            {
                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 200,
                    Data = user
                };
            }

        }


        public string RemoveBarber(int userID)
        {
            var user = repositoryContext.Users.FirstOrDefault(x => x.ID == userID);
            repositoryContext.Appointment.RemoveRange(repositoryContext.Appointment.Where(x => x.DoctorId == user.ID));
            repositoryContext.AvailSlots.RemoveRange(repositoryContext.AvailSlots.Where(x => x.BarberID == user.ID));
            repositoryContext.Users.Remove(user);
            repositoryContext.SaveChanges();
            return "Barber Removed Successfully";
        }

        public string RemoveBook(int userID)
        {
            var book = repositoryContext.Book.FirstOrDefault(x => x.ID == userID);
            //repositoryContext.Appointment.RemoveRange(repositoryContext.Appointment.Where(x => x.DoctorId == user.ID));
            //repositoryContext.AvailSlots.RemoveRange(repositoryContext.AvailSlots.Where(x => x.BarberID == user.ID));
            repositoryContext.Book.Remove(book);
            repositoryContext.SaveChanges();
            return "Book Removed Successfully";
        }
        public string RemoveLibraryBook(int id)
        {
            var book = repositoryContext.BookLibrary.FirstOrDefault(x => x.ID == id);
            //repositoryContext.Appointment.RemoveRange(repositoryContext.Appointment.Where(x => x.DoctorId == user.ID));
            //repositoryContext.AvailSlots.RemoveRange(repositoryContext.AvailSlots.Where(x => x.BarberID == user.ID));
            repositoryContext.BookLibrary.Remove(book);
            repositoryContext.SaveChanges();
            return "Book Removed Successfully";
        }
        public SwallResponseWrapper SearchBarbers(int SalonId)
        {
            var user = repositoryContext.Users.Where(x => x.SalonId == SalonId).ToList();
            var file = repositoryContext.Files.ToList();

            var data = (from U in user
                        join F in file on U.ID equals F.UserId into fil
                        from File in fil.DefaultIfEmpty()
                        select new
                        {
                            ID = U.ID,
                            FirstName = U.FirstName,
                            LastName = U.LastName,
                            Phone = U.Phone,
                            Address = U.Address,
                            Image = (File == null || File.DataFiles == null ? "God dammit work" : "data:image/png;base64," + Convert.ToBase64String(File.DataFiles))
                        }
                        ).ToList();

            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 200,
                Data = data
            };


        }

        public int GetSalonID(int userID)
        {
            var user = repositoryContext.Users.FirstOrDefault(x => x.ID == userID).SalonId;

            return (int)user;
        }
        public SwallResponseWrapper GetAllBooks(SearchDoctorFilterDto search)
        {
            //var doctorSpecialities = repositoryContext.DoctorSpecialist.AsQueryable();
            var books = repositoryContext.Book.AsQueryable();
            //if (search.SpecialistId.Length > 0)
            //{
            //    doctorSpecialities = doctorSpecialities.Where(x => search.SpecialistId.Contains((int)x.SpecialistId));

            //}

            if (search.Keyword.Length > 0)
            {
                books = books.Where(x => (x.Title.Contains(search.Keyword) || x.PublisherName.Contains(search.Keyword) || x.AuthorName.Contains(search.Keyword)));
            }
            if (search.Title.Length > 0 || search.Publisher.Length > 0 || search.Author.Length > 0)
            {
                books = books.Where(x => (x.Title.Contains(search.Title) && x.PublisherName.Contains(search.Publisher) && x.AuthorName.Contains(search.Author)));
            }




            //var data = (from DS in doctorSpecialities
            //            join u in salons on DS.BarberId equals u.RegisterBy
            //            //join s in repositoryContext.Specialist on DS.SpecialistId equals s.ID
            //            select new
            //            {
            //                ID = u.ID,
            //                Name = u.Name,
            //                Address = u.Address,
            //                Logo = u.SalonLogo,
            //                OwnerId = u.RegisterBy,
            //                Phone = repositoryContext.Users.Single(x => x.ID == u.RegisterBy).Phone,
            //                Email = repositoryContext.Users.Single(x => x.ID == u.RegisterBy).Email,

            //            }).Distinct();


            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 200,
                Data = books.ToList()
            };



        }
        public SwallResponseWrapper OrderBook(OrderDto dto)
        {

            Orders order = new Orders
            {
                BookId = dto.BookId,
                OrderBy = dto.OrderBy,
                Address = dto.Address,
                Copies = dto.Copies,
                BookCreatedBy = dto.BookCreatedBy,
                Phone = dto.Phone,
                Status = 1, //order Place (pending)
                Date = DateTime.Now.ToString(),
                Bill = dto.Price * dto.Copies
            };

            repositoryContext.Add(order);
            var book = repositoryContext.Book.FirstOrDefault(x => x.ID == dto.BookId);
            var copies = book.CopiesInStock;
            copies = copies - dto.Copies;
            book.CopiesInStock = copies;
            repositoryContext.SaveChanges();
            return new SwallResponseWrapper()
            {
                SwallText = LoginUser.UserCreatedScuccessfully,
                StatusCode = 200,
                Data = dto
            };
        }
        public SwallResponseWrapper GetBook(int id)
        {

            var record = repositoryContext.Book.FirstOrDefault(x => x.ID == id);

            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 200,
                Data = record
            };

        }

        public SwallResponseWrapper GetUserOrders(int UserId)
        {

            var order = repositoryContext.Orders.Where(x => x.OrderBy == UserId).ToList();
            if (order.Count > 0)
            {
                var book = repositoryContext.Book.ToList();

                var data = (from O in order
                            join B in book on O.BookId equals B.ID into fil
                            from File in fil.DefaultIfEmpty()
                            select new
                            {
                                ID = O.ID,
                                Bill = O.Bill,
                                Copies = O.Copies,
                                Status = O.Status,
                                Date = O.Date,
                                Title = File.Title,
                                Author = File.AuthorName,
                            }
                            ).ToList();

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 200,
                    Data = data
                };
            }
            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 400,
                Data = null
            };
        }


        public SwallResponseWrapper GetSellerOrders(int UserId)
        {

            var order = repositoryContext.Orders.Where(x => x.BookCreatedBy == UserId).ToList();
            if (order.Count > 0)
            {
                var book = repositoryContext.Book.ToList();
                var data = (from O in order
                            join B in book on O.BookId equals B.ID into fil
                            from File in fil.DefaultIfEmpty()
                            select new
                            {
                                ID = O.ID,
                                Bill = O.Bill,
                                Copies = O.Copies,
                                Status = O.Status,
                                Date = O.Date,
                                Title = File.Title,
                                Name = repositoryContext.Users.FirstOrDefault(x => x.ID == O.OrderBy).FirstName + " " + repositoryContext.Users.FirstOrDefault(x => x.ID == O.OrderBy).LastName,
                                Address = O.Address
                            }
                            ).ToList();

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 200,
                    Data = data
                };
            }
            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 400,
                Data = null
            };
        }
        public SwallResponseWrapper OrderAction(OrderActionDto dto)
        {
            var app = repositoryContext.Orders.FirstOrDefault(x => x.ID == dto.id);
            if (dto.action == 1)
            {

                repositoryContext.Remove(app);
            }
            else if (dto.action == 2)
            {
                app.Status = 2;
                repositoryContext.Update(app);
            }
            else if (dto.action == 3)
            {
                app.Status = 3;
                repositoryContext.Update(app);
            }

            repositoryContext.SaveChanges();

            return new SwallResponseWrapper()
            {
                SwallText = new Commons().Delete,
                StatusCode = 200,
                Data = "Done"
            };
        }
        public SwallResponseWrapper RequestBook(RequestDto dto)
        {

            RequestBook request = new RequestBook
            {
                Title = dto.Title,
                AuthorName = dto.AuthorName,
                Address = dto.Address,
                PublisherName = dto.PublisherName,
                Edition = dto.Edition,
                RequestBy = dto.RequestBy,
                Status = 1, //request Place (pending)

                AcceptedBy = null
            };

            repositoryContext.Add(request);
            repositoryContext.SaveChanges();
            return new SwallResponseWrapper()
            {
                SwallText = LoginUser.UserCreatedScuccessfully,
                StatusCode = 200,
                Data = 1
            };
        }
        public SwallResponseWrapper GetBookRequests(int id)
        {

            var request = repositoryContext.RequestBook.Where(x => x.Status == 1 & x.RequestBy != id).ToList();
            if (request.Count > 0)
            {
                var user = repositoryContext.Users.ToList();
                var data = (from R in request
                            join U in user on R.RequestBy equals U.ID into fil
                            from File in fil.DefaultIfEmpty()
                            select new
                            {
                                ID = R.Id,
                                Title = R.Title,
                                Author = R.AuthorName,
                                Publisher = R.PublisherName,
                                Edition = R.Edition,
                                Address = R.Address,
                                Name = repositoryContext.Users.FirstOrDefault(x => x.ID == R.RequestBy).FirstName + " " + repositoryContext.Users.FirstOrDefault(x => x.ID == R.RequestBy).LastName,

                            }
                            ).ToList();

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 200,
                    Data = data
                };
            }
            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 400,
                Data = null
            };
        }

        public SwallResponseWrapper GetUserRequests(int id)
        {

            var requests = repositoryContext.RequestBook.Where(x => x.RequestBy == id).ToList();

            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 400,
                Data = requests
            };
        }
        public SwallResponseWrapper RequestAccepted(AcceptRequest dto)
        {
            var app = repositoryContext.RequestBook.FirstOrDefault(x => x.Id == dto.RequestId);

            app.Status = 2;
            app.AcceptedBy = dto.AcceptBy;
            repositoryContext.Update(app);


            repositoryContext.SaveChanges();

            return new SwallResponseWrapper()
            {
                SwallText = new Commons().Delete,
                StatusCode = 200,
                Data = "Done"
            };
        }

        public SwallResponseWrapper CancelRequest(int id)
        {

            var request = repositoryContext.RequestBook.FirstOrDefault(x => x.Id == id);
            repositoryContext.Remove(request);
            repositoryContext.SaveChanges();
            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 400,
                Data = 1
            };
        }

        public SwallResponseWrapper AddLibraryBook(LibraryDto dto)
        {

            BookLibrary LibraryBook = new BookLibrary
            {
                Title = dto.Title,
                Author = dto.Author,
                Publisher = dto.Publisher,
                Link = dto.Link,
                Owner = dto.Owner,
            };

            repositoryContext.Add(LibraryBook);
            repositoryContext.SaveChanges();
            return new SwallResponseWrapper()
            {
                SwallText = LoginUser.UserCreatedScuccessfully,
                StatusCode = 200,
                Data = 1
            };
        }

        public SwallResponseWrapper GetLibBooks(int id)
        {

            var books = repositoryContext.BookLibrary.Where(x => x.Owner == id).ToList();

            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 200,
                Data = books
            };
        }
        public SwallResponseWrapper AddToWishlist(WishDto dto)
        {

            WishList wish = new WishList
            {
                WishBy = dto.UserId,
                BookId = dto.BookId,

            };

            repositoryContext.Add(wish);
            repositoryContext.SaveChanges();
            return new SwallResponseWrapper()
            {
                SwallText = LoginUser.UserCreatedScuccessfully,
                StatusCode = 200,
                Data = 1
            };
        }
        public SwallResponseWrapper GetWishBooks(int id)
        {
            var wish = repositoryContext.WishList.Where(x => x.WishBy ==id).ToList();
            if (wish.Count > 0)
            {
                var book = repositoryContext.Book.ToList();
                var data = (from W in wish
                            join B in book on W.BookId equals B.ID into fil
                            from File in fil.DefaultIfEmpty()
                            select new
                            {   
                                ID = File.ID,
                                Title = File.Title,
                                Author = File.AuthorName,
                                Publisher = File.PublisherName,
                                Price = File.CopiesInStock,
                                copiesInStock = File.CopiesInStock,
                            }
                            ).ToList();

                return new SwallResponseWrapper()
                {
                    SwallText = null,
                    StatusCode = 200,
                    Data = data
                };
            }
            return new SwallResponseWrapper()
            {
                SwallText = null,
                StatusCode = 400,
                Data = null
            };
        }
        public SwallResponseWrapper Feedback(FeedDto dto)
        {

            Feedback feed = new Feedback
            {
                UserId = dto.UserId,
                StoreId = dto.StoreId,
                feedback=dto.feedback

            };

            repositoryContext.Add(feed);
            repositoryContext.SaveChanges();
            return new SwallResponseWrapper()
            {
                SwallText = LoginUser.UserCreatedScuccessfully,
                StatusCode = 200,
                Data = 1
            };
        }
    }
}


  

    
