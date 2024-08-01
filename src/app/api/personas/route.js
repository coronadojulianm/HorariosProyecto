import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Función para convertir BigInt a string en un objeto
function serializeBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
  );
}

export async function GET() {
  try {
    const personas = await prisma.personas.findMany();
    const serializedPersonas = serializeBigInt(personas);
    return NextResponse.json({ data: serializedPersonas }, { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const persona = await prisma.personas.create({
      data: data
    });
    const serializedPersona = serializeBigInt(persona);
    return new NextResponse(JSON.stringify(serializedPersona), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
