﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PatientInformationPortalWebAPI.DAL;

#nullable disable

namespace PatientInformationPortalWebAPI.Migrations
{
    [DbContext(typeof(PatientDbContext))]
    [Migration("20230706203058_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.Allergies", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AllergyName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Allergies");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.Allergies_Details", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AllergiesID")
                        .HasColumnType("int");

                    b.Property<int>("PatientID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AllergiesID");

                    b.HasIndex("PatientID");

                    b.ToTable("Allergies_Details");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.DiseaseInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("DiseaseName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DiseaseInformations");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.NCD", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NCDName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("NCDs");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.NCD_Details", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("NCDID")
                        .HasColumnType("int");

                    b.Property<int>("PatientID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("NCDID");

                    b.HasIndex("PatientID");

                    b.ToTable("NCD_Details");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DiseaseInformationId")
                        .HasColumnType("int");

                    b.Property<string>("Epilepsy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DiseaseInformationId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.Allergies_Details", b =>
                {
                    b.HasOne("PatientInformationPortalWebAPI.Models.Allergies", "Allergies")
                        .WithMany()
                        .HasForeignKey("AllergiesID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PatientInformationPortalWebAPI.Models.Patient", "Patient")
                        .WithMany("Allergies")
                        .HasForeignKey("PatientID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Allergies");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.NCD_Details", b =>
                {
                    b.HasOne("PatientInformationPortalWebAPI.Models.NCD", "NCD")
                        .WithMany()
                        .HasForeignKey("NCDID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PatientInformationPortalWebAPI.Models.Patient", "Patient")
                        .WithMany("NCDs")
                        .HasForeignKey("PatientID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("NCD");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.Patient", b =>
                {
                    b.HasOne("PatientInformationPortalWebAPI.Models.DiseaseInformation", "DiseaseInformation")
                        .WithMany()
                        .HasForeignKey("DiseaseInformationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DiseaseInformation");
                });

            modelBuilder.Entity("PatientInformationPortalWebAPI.Models.Patient", b =>
                {
                    b.Navigation("Allergies");

                    b.Navigation("NCDs");
                });
#pragma warning restore 612, 618
        }
    }
}
