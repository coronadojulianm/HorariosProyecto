import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Función para convertir BigInt a string en un objeto
function serializeBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
  );
}

export async function GET(request, { params }) {
  const id = parseInt(params.id, 10); // Añadido el radix 10 para asegurar la conversión correcta
  console.log(id);
  try {
    const persona = await prisma.personas.findUnique({
      where: { id_persona: id },
    });
    if (!persona) {
      return new NextResponse(`ID "${id}" de usuario no encontrada`, { status: 404 });
    }
    const serializedPersona = serializeBigInt(persona);
    return NextResponse.json(serializedPersona);
  } catch (error) {
    console.error('Error fetching persona:', error); // Añadido logging para errores
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id, 10); // Añadido el radix 10 para asegurar la conversión correcta
  try {
    const resultado = await prisma.personas.delete({
      where: { id_persona: id }
    });
    const serializedResultado = serializeBigInt(resultado);
    return NextResponse.json({ message: "Usuario eliminado con éxito", resultado: serializedResultado }, { status: 200 });
  } catch (error) {
    console.error('Error deleting persona:', error); // Añadido logging para errores
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  console.log('Request params:', params);
  const id = parseInt(params.id, 10);
  const data = await request.json();
  console.log('Data to update:', data);

  // Convertir el campo municipio a entero
  if (data.municipio) {
    data.municipio = parseInt(data.municipio, 10);
  }

  try {
    const resultado = await prisma.personas.update({
      where: { id_persona: id },
      data: data
    });
    if (!resultado) {
      return new NextResponse(`ID "${id}" del usuario no encontrada para actualizar`, { status: 404 });
    }
    console.log('Update result:', resultado);
    const serializedResultado = serializeBigInt(resultado);
    return NextResponse.json({ message: "Usuario actualizado con éxito", resultado: serializedResultado }, { status: 200 });
  } catch (error) {
    console.error('Error updating persona:', error);
    return new NextResponse(JSON.stringify({ error: 'Error al actualizar persona' }), { status: 500 });
  }
}


