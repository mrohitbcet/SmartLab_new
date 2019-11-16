using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class reportdetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReportDetails",
                columns: table => new
                {
                    RptDetailsID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ReportID = table.Column<int>(nullable: false),
                    GroupId = table.Column<int>(nullable: false),
                    TestId = table.Column<int>(nullable: false),
                    TestValue = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportDetails", x => x.RptDetailsID);
                    table.ForeignKey(
                        name: "FK_ReportDetails_GroupMasters_GroupId",
                        column: x => x.GroupId,
                        principalTable: "GroupMasters",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportDetails_Reports_ReportID",
                        column: x => x.ReportID,
                        principalTable: "Reports",
                        principalColumn: "ReportID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReportDetails_GroupId",
                table: "ReportDetails",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportDetails_ReportID",
                table: "ReportDetails",
                column: "ReportID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReportDetails");
        }
    }
}
