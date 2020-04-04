using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace college.models
{
  public class TaskDetail
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Project { get; set; }
        public DateTime Date { get; set; }
        public int Hours { get; set; }
        public bool isPaid { get; set; }
        public DateTime CreatedDate { get; set; }

       
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public UserMaster UserMaster { get; set; }
       
       

    }
}
