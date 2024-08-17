import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const role = url.searchParams.get("role");
  const nombres = url.searchParams.get("nombres");

  console.log("URL:", request.url);
  console.log("Role:", role);
  console.log("Nombres:", nombres);
  

  if (!role) {
    return new Response("Role parameter is required", { status: 400 });
  }

  if (role === "Instructor" && !nombres) {
    return new Response(
      "Nombre del instructor es requerido para el rol de Instructor",
      { status: 400 }
    );
  }

  try {
    let result;

    if (role === "Instructor") {
      result = await prisma.$queryRaw`
        SELECT 
            p.nombres AS instructor,
            dias.dia AS dia_semana,
            h.hora_inicio,
            h.hora_fin,
            h.fecha_inicio,
            h.fecha_fin,
            h.cantidad_horas,
            a.nombre_amb AS ambiente,
            f.codigo AS ficha,
            h.estado AS estado_horario,
            ar.nombre_area AS area
        FROM 
            (SELECT 'lunes' AS dia UNION ALL
             SELECT 'martes' AS dia UNION ALL
             SELECT 'miercoles' AS dia UNION ALL
             SELECT 'jueves' AS dia UNION ALL
             SELECT 'viernes' AS dia UNION ALL
             SELECT 'sabado' AS dia UNION ALL
             SELECT 'domingo' AS dia) AS dias
        LEFT JOIN
            personas p ON p.nombres = ${nombres}
        LEFT JOIN
            vinculacion v ON p.id_persona = v.instructor
        LEFT JOIN
            horarios h ON v.id_vinculacion = h.instructor AND dias.dia = h.dia
        LEFT JOIN
            ambientes a ON h.ambiente = a.id_ambiente
        LEFT JOIN
            fichas f ON h.ficha = f.codigo
        LEFT JOIN
            areas ar ON v.area = ar.id_area
        ORDER BY 
            FIELD(dias.dia, 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo');
      `;
    } else if (role === "Lider") {
      result = await prisma.$queryRaw`
        SELECT 
            p.nombres AS instructor,
            dias.dia AS dia_semana,
            h.id_horario AS id,
            h.hora_inicio,
            h.hora_fin,
            h.fecha_inicio,
            h.fecha_fin,
            h.cantidad_horas,
            a.nombre_amb AS ambiente,
            f.codigo AS ficha,
            h.estado AS estado_horario,
            ar.nombre_area AS area
        FROM 
            (SELECT 'lunes' AS dia UNION ALL
             SELECT 'martes' AS dia UNION ALL
             SELECT 'miercoles' AS dia UNION ALL
             SELECT 'jueves' AS dia UNION ALL
             SELECT 'viernes' AS dia UNION ALL
             SELECT 'sabado' AS dia UNION ALL
             SELECT 'domingo' AS dia) AS dias
        LEFT JOIN
            personas p ON p.id_persona IN (
                SELECT v.instructor
                FROM vinculacion v
                INNER JOIN areas ar ON v.area = ar.id_area
                WHERE ar.lider = (
                    SELECT id_persona
                    FROM personas
                    WHERE nombres = ${nombres}
                )
            )
        LEFT JOIN
            vinculacion v ON p.id_persona = v.instructor
        LEFT JOIN
            horarios h ON v.id_vinculacion = h.instructor AND dias.dia = h.dia
        LEFT JOIN
            ambientes a ON h.ambiente = a.id_ambiente
        LEFT JOIN
            fichas f ON h.ficha = f.codigo
        LEFT JOIN
            areas ar ON v.area = ar.id_area
        ORDER BY 
            p.nombres, FIELD(dias.dia, 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo');
      `;
    } else {
      result = await prisma.$queryRaw`
        WITH InstructorVinculacionCount AS (
          SELECT 
              p.id_persona,
              COUNT(v.id_vinculacion) AS vinculaciones
          FROM 
              personas p
          LEFT JOIN 
              vinculacion v ON p.id_persona = v.instructor
          GROUP BY 
              p.id_persona
          HAVING 
              COUNT(v.id_vinculacion) = 1
        )
        
        SELECT 
            h.id_horario AS id,
            p.nombres AS instructor,
            dias.dia AS dia_semana,
            h.hora_inicio,
            h.hora_fin,
            h.fecha_inicio,
            h.fecha_fin,
            h.cantidad_horas,
            a.nombre_amb AS ambiente,
            f.codigo AS ficha,
            h.estado AS estado_horario,
            ar.nombre_area AS area
        FROM 
            (SELECT 'lunes' AS dia UNION ALL
             SELECT 'martes' AS dia UNION ALL
             SELECT 'miercoles' AS dia UNION ALL
             SELECT 'jueves' AS dia UNION ALL
             SELECT 'viernes' AS dia UNION ALL
             SELECT 'sabado' AS dia UNION ALL
             SELECT 'domingo' AS dia) AS dias
        CROSS JOIN
            InstructorVinculacionCount ivc
        LEFT JOIN
            personas p ON p.id_persona = ivc.id_persona
        LEFT JOIN
            vinculacion v ON p.id_persona = v.instructor
        LEFT JOIN
            horarios h ON v.id_vinculacion = h.instructor AND dias.dia = h.dia
        LEFT JOIN
            ambientes a ON h.ambiente = a.id_ambiente
        LEFT JOIN
            fichas f ON h.ficha = f.codigo
        LEFT JOIN
            areas ar ON v.area = ar.id_area
        ORDER BY 
            p.nombres, FIELD(dias.dia, 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo');
      `;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error executing query:", error.message, error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}






