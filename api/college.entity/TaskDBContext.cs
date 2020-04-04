using college.models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace college.entity
{
    public partial class TaskDBContext : DbContext
    {

        public TaskDBContext() : base("name=taskdetails") { }

        public virtual DbSet<UserMaster> UserMaster { get; set; }
        public virtual DbSet<TaskDetail> TaskDetail { get; set; }

        //public virtual DbSet<Course> Course { get; set; }
        //public virtual DbSet<Banner> Banner { get; set; }
        //public virtual DbSet<Library> Library { get; set; }
        //public virtual DbSet<Gallery> Gallery { get; set; }
        //public virtual DbSet<Faculty> Faculty { get; set; }
        //public virtual DbSet<Events> Events { get; set; }
        //public virtual DbSet<Department> Department { get; set; }
        //public virtual DbSet<Facility> Facility { get; set; }
        //public virtual DbSet<StudentAdmissionForm> StudentAdmissionForm { get; set; }
        //public virtual DbSet<StudentQualificationMapping> StudentQualificationMapping { get; set; }
        //public virtual DbSet<Enquiry> Enquiry { get; set; }
        


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var instance = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
            modelBuilder.Entity<UserMaster>().ToTable("UserMaster");
            modelBuilder.Entity<TaskDetail>().ToTable("TaskDetail");

            //modelBuilder.Entity<Course>().ToTable("Course");
            //modelBuilder.Entity<Banner>().ToTable("Banner");
            //modelBuilder.Entity<Library>().ToTable("Library");
            //modelBuilder.Entity<Gallery>().ToTable("Gallery");
            //modelBuilder.Entity<Faculty>().ToTable("Faculty");
            //modelBuilder.Entity<Events>().ToTable("Events");
            //modelBuilder.Entity<Department>().ToTable("Department");
            //modelBuilder.Entity<Facility>().ToTable("Facility");
            //modelBuilder.Entity<StudentAdmissionForm>().ToTable("StudentAdmissionForm");
            //modelBuilder.Entity<StudentQualificationMapping>().ToTable("StudentQualificationMapping");
            //modelBuilder.Entity<Enquiry>().ToTable("Enquiry");
        }
      

    }
}
