using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace college.models
{
  public  class Department
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
       
        public string ImgUrl { get; set; }

        [Required]
        public string Description { get; set; }
       

        [DefaultValue(true)]
        public bool Status { get; set; }
    }
}
