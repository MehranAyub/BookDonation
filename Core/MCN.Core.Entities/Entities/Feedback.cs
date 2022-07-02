using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MCN.Core.Entities.Entities
{
    public class Feedback
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public  int ID { get;set;}
        public string feedback { get; set; }
        public int UserId { get; set; }
        public int StoreId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User Users { get; set; }
        [ForeignKey(nameof(StoreId))]
        public Salon Store { get; set; }
    }
}
