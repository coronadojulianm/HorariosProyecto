import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Función para convertir BigInt a string en un objeto
function serializeBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
  );
}

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  console.log(id);
  try {
    const personas = await prisma.personas.findFirst({
      where: { id_persona: id },
    });
    if (!personas) {
      return new NextResponse(`ID "${id}" de usuario no encontrada`, { status: 404 });
    }
    const serializedPersonas = serializeBigInt(personas);
    return NextResponse.json(serializedPersonas);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function DELETE(request, { params }) {
    const id = parseInt(params.id);
    try {
    const resultado = await prisma.personas.delete({
        where: { id_persona: id }
        });
        const serializedResultado = serializeBigInt(resultado);
        return NextResponse.json({ message: "Usuario eliminado con éxito", resultado: serializedResultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function PUT(request, { params }) {
    console.log(params);
    const id = parseInt(params.id);
    const data = await request.json();
    try {
      const resultado = await prisma.personas.update({
        where: { id_persona: id },
        data: data
      });
      if (!resultado) {
        return new NextResponse(`ID "${id}" del usuario no encontrada para actualizar`, {
          status: 404,
        });
      }
      const serializedResultado = serializeBigInt(resultado);
      return NextResponse.json({ message: "Usuario actualizado con éxito", resultado: serializedResultado }, { status: 200 });
    } catch (error) {
      return new NextResponse(error.message, { status: 500 });
    }
}