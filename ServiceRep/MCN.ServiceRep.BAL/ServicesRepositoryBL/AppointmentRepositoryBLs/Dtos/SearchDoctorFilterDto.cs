using System;
using System.Collections.Generic;
using System.Text;

namespace MCN.ServiceRep.BAL.ServicesRepositoryBL.AppointmentRepositoryBLs.Dtos
{
   public class SearchDoctorFilterDto
    {
        public string Keyword { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }

    }
}
