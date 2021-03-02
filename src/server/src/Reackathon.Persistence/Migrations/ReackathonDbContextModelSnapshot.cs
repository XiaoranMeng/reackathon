﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Reackathon.Persistence;

namespace Reackathon.Persistence.Migrations
{
    [DbContext(typeof(ReackathonDbContext))]
    partial class ReackathonDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.3");

            modelBuilder.Entity("Reackathon.Domain.Project", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ThemeId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ThemeId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("Reackathon.Domain.Team", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ProjectId")
                        .HasColumnType("TEXT");

                    b.Property<int>("TableNumber")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Tagline")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Reackathon.Domain.Theme", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prize")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Themes");
                });

            modelBuilder.Entity("Reackathon.Domain.Project", b =>
                {
                    b.HasOne("Reackathon.Domain.Theme", "Theme")
                        .WithMany()
                        .HasForeignKey("ThemeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Theme");
                });

            modelBuilder.Entity("Reackathon.Domain.Team", b =>
                {
                    b.HasOne("Reackathon.Domain.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });
#pragma warning restore 612, 618
        }
    }
}
