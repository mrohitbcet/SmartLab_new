using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class InitialCreate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RptPatientID",
                table: "Reports",
                newName: "PatientID");

            migrationBuilder.RenameColumn(
                name: "RptDoctorID",
                table: "Reports",
                newName: "DoctorID");

            migrationBuilder.RenameColumn(
                name: "RptCID",
                table: "Reports",
                newName: "CID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PatientID",
                table: "Reports",
                newName: "RptPatientID");

            migrationBuilder.RenameColumn(
                name: "DoctorID",
                table: "Reports",
                newName: "RptDoctorID");

            migrationBuilder.RenameColumn(
                name: "CID",
                table: "Reports",
                newName: "RptCID");
        }
    }
}
