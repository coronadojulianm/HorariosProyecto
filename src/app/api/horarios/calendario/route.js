import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const role = url.searchParams.get('role'); // El rol del usuario
  const nombresInstructor = url.searchParams.get('nombres'); // El nombre del instructor

  if (!role) {
    return new Response('Role parameter is required', { status: 400 });
  }

  if (role === 'Instructor' && !nombresInstructor) {
    return new Response('Nombre del instructor es requerido para el rol de Instructor', { status: 400 });
  }

  try {
    let result;

    if (role === 'Instructor') {
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
            h.estado AS estado_horario
        FROM 
            (SELECT 'lunes' AS dia UNION ALL
             SELECT 'martes' AS dia UNION ALL
             SELECT 'miércoles' AS dia UNION ALL
             SELECT 'jueves' AS dia UNION ALL
             SELECT 'viernes' AS dia UNION ALL
             SELECT 'sábado' AS dia UNION ALL
             SELECT 'domingo' AS dia) AS dias
        LEFT JOIN
            personas p ON p.nombres = ${nombresInstructor}
        LEFT JOIN
            vinculacion v ON p.id_persona = v.instructor
        LEFT JOIN
            horarios h ON v.id_vinculacion = h.instructor AND dias.dia = h.dia
        LEFT JOIN
            ambientes a ON h.ambiente = a.id_ambiente
        LEFT JOIN
            fichas f ON h.ficha = f.codigo
        ORDER BY 
            FIELD(dias.dia, 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo');
      `;
    } else {
      result = await prisma.$queryRaw`
        SELECT 
            p.nombres AS instructor,
            dias.dia AS dia_semana,
            h.hora_inicio,
            h.hora_fin,
            h.cantidad_horas,
            a.nombre_amb AS ambiente,
            f.codigo AS ficha,
            h.estado AS estado_horario
        FROM 
            (SELECT 'lunes' AS dia UNION ALL
             SELECT 'martes' AS dia UNION ALL
             SELECT 'miercoles' AS dia UNION ALL
             SELECT 'jueves' AS dia UNION ALL
             SELECT 'viernes' AS dia UNION ALL
             SELECT 'sabado' AS dia UNION ALL
             SELECT 'domingo' AS dia) AS dias
        CROSS JOIN
            personas p
        LEFT JOIN
            vinculacion v ON p.id_persona = v.instructor
        LEFT JOIN
            horarios h ON v.id_vinculacion = h.instructor AND dias.dia = h.dia
        LEFT JOIN
            ambientes a ON h.ambiente = a.id_ambiente
        LEFT JOIN
            fichas f ON h.ficha = f.codigo
        ORDER BY 
            p.nombres, FIELD(dias.dia, 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo');
      `;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}











