using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace college.models
{
   public class UserMaster
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        [DefaultValue(true)]
        public bool Status { get; set; }

        public string Address { get; set; }

        public string Organization { get; set; }

        public int MobileNo { get; set; }

        public string Designation { get; set; }
        public string Skill { get; set; }
        public string About { get; set; }
        public decimal? RatePerhours { get; set; }

    }
}
