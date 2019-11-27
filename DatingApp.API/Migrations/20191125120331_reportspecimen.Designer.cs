﻿// <auto-generated />
using System;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DatingApp.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20191125120331_reportspecimen")]
    partial class reportspecimen
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DatingApp.API.Models.Client", b =>
                {
                    b.Property<int>("CID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasMaxLength(500);

                    b.Property<string>("CName")
                        .HasMaxLength(200);

                    b.Property<string>("Contact")
                        .HasMaxLength(100);

                    b.Property<string>("Email")
                        .HasMaxLength(200);

                    b.HasKey("CID");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("DatingApp.API.Models.Doctor", b =>
                {
                    b.Property<int>("DoctorID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CID");

                    b.Property<string>("Contact")
                        .HasMaxLength(100);

                    b.Property<string>("Doctorname")
                        .HasMaxLength(200);

                    b.Property<string>("Email")
                        .HasMaxLength(200);

                    b.Property<string>("RegistrationNo")
                        .HasMaxLength(100);

                    b.HasKey("DoctorID");

                    b.HasIndex("CID");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("DatingApp.API.Models.GroupMaster", b =>
                {
                    b.Property<int>("GroupId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("GroupName")
                        .HasMaxLength(100);

                    b.HasKey("GroupId");

                    b.ToTable("GroupMasters");
                });

            modelBuilder.Entity("DatingApp.API.Models.Patient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CID");

                    b.Property<int>("DRrefby");

                    b.Property<string>("OPD")
                        .HasMaxLength(100);

                    b.Property<string>("address")
                        .HasMaxLength(500);

                    b.Property<string>("city")
                        .HasMaxLength(100);

                    b.Property<string>("contactNo")
                        .HasMaxLength(40);

                    b.Property<string>("dateofbirth")
                        .HasMaxLength(100);

                    b.Property<string>("email")
                        .HasMaxLength(200);

                    b.Property<string>("gender")
                        .HasMaxLength(10);

                    b.Property<string>("name")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("DatingApp.API.Models.Report", b =>
                {
                    b.Property<int>("ReportID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CID");

                    b.Property<string>("CreatedBy")
                        .HasMaxLength(100);

                    b.Property<DateTime>("CreatedDate");

                    b.Property<int>("DoctorID");

                    b.Property<int>("PatientID");

                    b.Property<string>("Specimen")
                        .HasMaxLength(200);

                    b.Property<string>("Status")
                        .HasMaxLength(50);

                    b.HasKey("ReportID");

                    b.HasIndex("CID");

                    b.HasIndex("PatientID");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("DatingApp.API.Models.ReportDetails", b =>
                {
                    b.Property<int>("RptDetailsID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GroupId");

                    b.Property<int>("ReportID");

                    b.Property<int>("TestId");

                    b.Property<string>("TestValue")
                        .HasMaxLength(100);

                    b.Property<bool>("isHighlight");

                    b.HasKey("RptDetailsID");

                    b.HasIndex("GroupId");

                    b.HasIndex("ReportID");

                    b.ToTable("ReportDetails");
                });

            modelBuilder.Entity("DatingApp.API.Models.TestMaster", b =>
                {
                    b.Property<int>("TestId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GroupId");

                    b.Property<string>("NormalRange")
                        .HasMaxLength(100);

                    b.Property<decimal>("Price");

                    b.Property<string>("TestName")
                        .HasMaxLength(200);

                    b.Property<string>("Unit")
                        .HasMaxLength(100);

                    b.HasKey("TestId");

                    b.HasIndex("GroupId");

                    b.ToTable("TestMasters");
                });

            modelBuilder.Entity("DatingApp.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CID");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Email")
                        .HasMaxLength(200);

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Role")
                        .HasMaxLength(10);

                    b.Property<string>("Username");

                    b.Property<bool>("isActive");

                    b.HasKey("Id");

                    b.HasIndex("CID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DatingApp.API.Models.Doctor", b =>
                {
                    b.HasOne("DatingApp.API.Models.Client", "Client")
                        .WithMany("Doctor")
                        .HasForeignKey("CID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatingApp.API.Models.Report", b =>
                {
                    b.HasOne("DatingApp.API.Models.Client")
                        .WithMany("Report")
                        .HasForeignKey("CID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DatingApp.API.Models.Patient", "Patient")
                        .WithMany("Report")
                        .HasForeignKey("PatientID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatingApp.API.Models.ReportDetails", b =>
                {
                    b.HasOne("DatingApp.API.Models.GroupMaster", "GroupMaster")
                        .WithMany("ReportDetails")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DatingApp.API.Models.Report", "Report")
                        .WithMany("ReportDetails")
                        .HasForeignKey("ReportID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatingApp.API.Models.TestMaster", b =>
                {
                    b.HasOne("DatingApp.API.Models.GroupMaster", "GroupMaster")
                        .WithMany("TestMaster")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DatingApp.API.Models.User", b =>
                {
                    b.HasOne("DatingApp.API.Models.Client", "Client")
                        .WithMany("User")
                        .HasForeignKey("CID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
