using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class test2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_CID",
                table: "Users",
                column: "CID");

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_CID",
                table: "Doctors",
                column: "CID");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Clients_CID",
                table: "Doctors",
                column: "CID",
                principalTable: "Clients",
                principalColumn: "CID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Clients_CID",
                table: "Users",
                column: "CID",
                principalTable: "Clients",
                principalColumn: "CID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Clients_CID",
                table: "Doctors");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Clients_CID",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_CID",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_CID",
                table: "Doctors");
        }
    }
}
