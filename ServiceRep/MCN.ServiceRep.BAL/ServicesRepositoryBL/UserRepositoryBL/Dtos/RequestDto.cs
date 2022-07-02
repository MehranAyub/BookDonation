using System;
using System.Collections.Generic;
using System.Text;

namespace MCN.ServiceRep.BAL.ServicesRepositoryBL.UserRepositoryBL.Dtos
{
    public class RequestDto
    {

        public string Title { get; set; }
        public string AuthorName { get; set; }
        public string PublisherName { get; set; }
        public string Edition { get; set; }
        public string Address { get; set; }
        public int? RequestBy { get; set; }

    }

    public class AcceptRequest
    {

        public int? RequestId { get; set; }
        public int? AcceptBy { get; set; }

    }
}
