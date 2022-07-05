using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MCN.Core.Entities.Entities
{
   public class Orders
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ID { get; set; }
        public int? BookId { get; set; }
        public int? OrderBy { get; set; }
        public string Date { get; set; }
        public int? Copies { get; set; }
        public int BookCreatedBy { get; set; }
        public int? Bill { get; set; }
        public int Status { get; set; }

        public string TrackId { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }
}
