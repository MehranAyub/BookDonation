using System;
using System.Collections.Generic;
using System.Text;

namespace MCN.ServiceRep.BAL.ServicesRepositoryBL.UserRepositoryBL.Dtos
{
    public class BookDto
    {
        public string Title { get; set; }
        public int Isbn { get; set; }
        public int Price { get; set; }
        public int Copies { get; set; }
        public string AuthName { get; set; }
        public string PubName { get; set; }
        public int CreatedBy { get; set; }
        public int StoreId { get; set; }
        public string Cover { get; set; }
        
    }

    public class LibraryDto
    {
        public string Title { get; set; }
      
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int Owner { get; set; }
        public string Link { get; set; }

    }

    public class WishDto
    {
        public int BookId { get; set; }
        public int UserId { get; set; }

    }
    public class FeedDto
    {
        public string feedback { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }

    }

}
