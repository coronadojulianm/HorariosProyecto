import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Incluye la relación con Personas para obtener el nombre del instructor
        const vinculacion = await prisma.vinculacion.findMany({
            include: {
                Personas: {
                    select: {
                        nombres: true // Solo selecciona el campo 'nombres' de Personas
                    }
                }
            }
        });

        // Mapea los datos para incluir el nombre del instructor en el resultado
        const result = vinculacion.map((vinc) => ({
            id_vinculacion: vinc.id_vinculacion,
            nombre: vinc.Personas.nombres // Incluye el nombre del instructor
        }));

        return NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}