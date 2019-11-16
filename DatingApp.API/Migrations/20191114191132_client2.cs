using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class client2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Doctors_DoctorID",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_DoctorID",
                table: "Reports");

            migrationBuilder.AddColumn<int>(
                name: "CID",
                table: "Patients",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reports_CID",
                table: "Reports",
                column: "CID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Clients_CID",
                table: "Reports",
                column: "CID",
                principalTable: "Clients",
                principalColumn: "CID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Clients_CID",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_CID",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "CID",
                table: "Patients");

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
    }
}
