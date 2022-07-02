using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MCN.Core.Entities.Entities
{
 public   class Book
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public int Isbn { get; set; }
        public int Price { get; set; }
        public int CopiesInStock { get; set; }
        public string PublisherName { get; set; }
        public string AuthorName { get; set; }
        public int CreatedBy { get; set; }
        public int StoreId { get; set; }
        [MaxLength]
        public string Cover { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public User Users { get; set; }
    }
}
