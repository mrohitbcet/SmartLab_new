using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class migrate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reports_DoctorID",
                table: "Reports",
                column: "DoctorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Doctors_DoctorID",
                table: "Reports",
                column: "DoctorID",
                principalTable: "Doctors",
                principalColumn: "DoctorID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Doctors_DoctorID",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_DoctorID",
                table: "Reports");
        }
    }
}
