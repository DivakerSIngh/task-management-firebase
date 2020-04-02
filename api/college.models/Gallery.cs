﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace college.models
{
   public class Gallery
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
       
        public string ImgUrl { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int Type { get; set; }

    }
}
