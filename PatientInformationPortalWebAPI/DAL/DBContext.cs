using Microsoft.EntityFrameworkCore;
using PatientInformationPortalWebAPI.Models;
using System.Data;

namespace PatientInformationPortalWebAPI.DAL
{
    public class DBContext
    {
    }
    public class PatientDbContext : DbContext
    {
        public PatientDbContext(DbContextOptions<PatientDbContext> options) : base(options)
        {
        }
        public IDbConnection Connection { get; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<DiseaseInformation> DiseaseInformations { get; set; }
        public DbSet<NCD> NCDs { get; set; }
        public DbSet<Allergies> Allergies { get; set; }
        public DbSet<NCD_Details> NCD_Details { get; set; }
        public DbSet<Allergies_Details> Allergies_Details { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB; database = Patientdb; TrustServerCertificate = True");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure any additional relationships or entity configurations using Fluent API
           
            modelBuilder.Entity<NCD_Details>()
                .HasKey(nd => nd.Id);

            modelBuilder.Entity<NCD_Details>()
                .HasOne(nd => nd.Patient)
                .WithMany(p => p.NCDs)
                .HasForeignKey(nd => nd.PatientID);

            modelBuilder.Entity<NCD_Details>()
                .HasOne(nd => nd.NCD)
                .WithMany()
                .HasForeignKey(nd => nd.NCDID);

            modelBuilder.Entity<Allergies_Details>()
     .HasKey(ad => ad.Id);

            modelBuilder.Entity<Allergies_Details>()
                .HasOne(ad => ad.Patient)
                .WithMany(p => p.Allergies)
                .HasForeignKey(ad => ad.PatientID);

            modelBuilder.Entity<Allergies_Details>()
                .HasOne(ad => ad.Allergies)
                .WithMany()
                .HasForeignKey(ad => ad.AllergiesID);

            base.OnModelCreating(modelBuilder);
        }
    }
}
