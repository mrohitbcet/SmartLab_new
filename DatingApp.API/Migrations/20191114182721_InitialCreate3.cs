using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class InitialCreate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reports_PatientID",
                table: "Reports",
                column: "PatientID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Patients_PatientID",
                table: "Reports",
                column: "PatientID",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Patients_PatientID",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_PatientID",
                table: "Reports");
        }
    }
}
