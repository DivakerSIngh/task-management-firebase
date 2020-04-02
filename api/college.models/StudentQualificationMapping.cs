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
  public  class StudentQualificationMapping
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Class { get; set; }
        [Required]
        public string YearOfPassing { get; set; }
        [Required]
        public string Subjects { get; set; }
        [Required]
        public string Boards { get; set; }

        // Foreign key to StudentAdmissionForm
        [ForeignKey("StudentAdmissionForm")]
        public int StudentAdmissionID { get; set; }
        public virtual StudentAdmissionForm StudentAdmissionForm { get; set; }

    }
}
