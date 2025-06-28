using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MEGA_PROMOS.Api.Migrations
{
    /// <inheritdoc />
    public partial class BaseInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colonias",
                columns: table => new
                {
                    colonia_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ciudad = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colonias", x => x.colonia_id);
                });

            migrationBuilder.CreateTable(
                name: "paquete_x_promocion",
                columns: table => new
                {
                    paquete_id = table.Column<int>(type: "int", nullable: false),
                    promocion_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paquete_x_promocion", x => new { x.paquete_id, x.promocion_id });
                });

            migrationBuilder.CreateTable(
                name: "paquete_x_servicios",
                columns: table => new
                {
                    paquete_id = table.Column<int>(type: "int", nullable: false),
                    servicio_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paquete_x_servicios", x => new { x.paquete_id, x.servicio_id });
                });

            migrationBuilder.CreateTable(
                name: "paquetes",
                columns: table => new
                {
                    paquete_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_paquete = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    precio = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paquetes", x => x.paquete_id);
                });

            migrationBuilder.CreateTable(
                name: "promociones",
                columns: table => new
                {
                    promocion_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    descuento = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    tipo_descuento = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_fin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    es_automatica = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_promociones", x => x.promocion_id);
                });

            migrationBuilder.CreateTable(
                name: "servicios",
                columns: table => new
                {
                    servicio_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre_servicio = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_servicios", x => x.servicio_id);
                });

            migrationBuilder.CreateTable(
                name: "Suscriptor",
                columns: table => new
                {
                    suscriptor_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    correo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    colonia_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suscriptor", x => x.suscriptor_id);
                });

            migrationBuilder.CreateTable(
                name: "suscriptores_x_paquete",
                columns: table => new
                {
                    suscriptor_id = table.Column<int>(type: "int", nullable: false),
                    paquete_id = table.Column<int>(type: "int", nullable: false),
                    fecha_inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_terminacion = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_suscriptores_x_paquete", x => new { x.suscriptor_id, x.paquete_id, x.fecha_inicio });
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Colonias");

            migrationBuilder.DropTable(
                name: "paquete_x_promocion");

            migrationBuilder.DropTable(
                name: "paquete_x_servicios");

            migrationBuilder.DropTable(
                name: "paquetes");

            migrationBuilder.DropTable(
                name: "promociones");

            migrationBuilder.DropTable(
                name: "servicios");

            migrationBuilder.DropTable(
                name: "Suscriptor");

            migrationBuilder.DropTable(
                name: "suscriptores_x_paquete");
        }
    }
}
