import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const instructor = searchParams.get('instructor');
  const dia = searchParams.get('dia');

  if (!instructor || !dia) {
    return new Response(JSON.stringify({ error: "Faltan parámetros en la solicitud" }), { status: 400 });
  }

  try {
    // Consulta SQL crudo con conversión de BigInt a Number
    const result = await prisma.$queryRaw`
      SELECT COUNT(*) AS count
      FROM Horarios
      WHERE instructor = ${parseInt(instructor, 10)}
      AND dia = ${dia}
    `;
    
    // Conversión de BigInt a Number
    const count = result[0]?.count ? Number(result[0].count) : 0;

    return new Response(JSON.stringify({ count }), { status: 200 });
  } catch (error) {
    console.error("Error al obtener los horarios:", error.message);
    return new Response(JSON.stringify({ error: `Error al obtener los horarios: ${error.message}` }), { status: 500 });
  }
}









