using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class reports5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    CID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CName = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.CID);
                });

            migrationBuilder.CreateTable(
                name: "GroupMasters",
                columns: table => new
                {
                    GroupId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GroupName = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupMasters", x => x.GroupId);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OPD = table.Column<string>(maxLength: 100, nullable: true),
                    name = table.Column<string>(maxLength: 100, nullable: true),
                    gender = table.Column<string>(maxLength: 10, nullable: true),
                    dateofbirth = table.Column<string>(maxLength: 100, nullable: true),
                    DRrefby = table.Column<int>(nullable: false),
                    email = table.Column<string>(maxLength: 200, nullable: true),
                    address = table.Column<string>(maxLength: 500, nullable: true),
                    city = table.Column<string>(maxLength: 100, nullable: true),
                    contactNo = table.Column<string>(maxLength: 40, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    ReportID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RptPatientID = table.Column<int>(nullable: false),
                    RptDoctorID = table.Column<int>(nullable: false),
                    RptCID = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 100, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.ReportID);
                });

            migrationBuilder.CreateTable(
                name: "Doctors",
                columns: table => new
                {
                    DoctorID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CID = table.Column<int>(nullable: false),
                    Doctorname = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctors", x => x.DoctorID);
                    table.ForeignKey(
                        name: "FK_Doctors_Clients_CID",
                        column: x => x.CID,
                        principalTable: "Clients",
                        principalColumn: "CID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CID = table.Column<int>(nullable: false),
                    Role = table.Column<string>(maxLength: 10, nullable: true),
                    Username = table.Column<string>(nullable: true),
                    Email = table.Column<string>(maxLength: 200, nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    isActive = table.Column<bool>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Clients_CID",
                        column: x => x.CID,
                        principalTable: "Clients",
                        principalColumn: "CID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestMasters",
                columns: table => new
                {
                    TestId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TestName = table.Column<string>(maxLength: 200, nullable: true),
                    GroupId = table.Column<int>(nullable: false),
                    Unit = table.Column<string>(maxLength: 100, nullable: true),
                    NormalRange = table.Column<string>(maxLength: 100, nullable: true),
                    Price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestMasters", x => x.TestId);
                    table.ForeignKey(
                        name: "FK_TestMasters_GroupMasters_GroupId",
                        column: x => x.GroupId,
                        principalTable: "GroupMasters",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_CID",
                table: "Doctors",
                column: "CID");

            migrationBuilder.CreateIndex(
                name: "IX_TestMasters_GroupId",
                table: "TestMasters",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CID",
                table: "Users",
                column: "CID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Doctors");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "TestMasters");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "GroupMasters");

            migrationBuilder.DropTable(
                name: "Clients");
        }
    }
}
