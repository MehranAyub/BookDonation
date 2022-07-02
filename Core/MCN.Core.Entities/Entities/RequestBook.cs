using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MCN.Core.Entities.Entities
{
   public class RequestBook
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
        public string AuthorName { get; set; }
        public string PublisherName { get; set; }
        public string Edition { get; set; }
        public string Address { get; set; }
        public int? RequestBy { get; set; }
        public int? AcceptedBy { get; set; }

        public int? Status { get; set; }

        [ForeignKey(nameof(AcceptedBy))]
        public User Users { get; set; }
       
        [ForeignKey(nameof(RequestBy))]
        public User User { get; set; }
    }
}
