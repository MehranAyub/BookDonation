using System;
using System.Collections.Generic;
using System.Text;

namespace MCN.ServiceRep.BAL.ServicesRepositoryBL.UserRepositoryBL.Dtos
{
  public  class OrderDto
    {
        public int? BookId { get; set; }
        public int? OrderBy { get; set; }
        public DateTime Date { get; set; }
        public int Copies { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public int Price { get; set; }
        public int BookCreatedBy { get; set; }
    }

    public class OrderActionDto
    {
        public int id { get; set; }
       public int action { get; set; }
    }

   

}
