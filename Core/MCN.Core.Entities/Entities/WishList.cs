using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MCN.Core.Entities.Entities
{
  public  class WishList
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ID { get; set; }
       
        public int BookId { get; set; }
        public int WishBy { get; set; }
        [ForeignKey(nameof(WishBy))]
        public User Users { get; set; }
       
        [ForeignKey(nameof(BookId))]
        public Book Book { get; set; }
    }
}
