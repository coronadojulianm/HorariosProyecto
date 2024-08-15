import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const horarios = await prisma.horarios.findMany();
        return NextResponse.json({ data: horarios }, { status: 200 });
    } catch (error) {
        console.error("Error en GET:", error);
        return new NextResponse(error.message, { status: 500 });
    }
}

// Backend: POST method in your /api/horarios route
export async function POST(request) {
    try {
        const data = await request.json();
        
        // Verificar si el id_vinculacion es válido
        const vinc = await prisma.vinculacion.findUnique({
            where: { id_vinculacion: data.instructor } // Buscar por id_vinculacion
        });

        if (!vinc) {
            return new NextResponse("El instructor no está vinculado correctamente.", { status: 400 });
        }

        // Crear el nuevo horario
        const horario = await prisma.horarios.create({
            data: {
                fecha_inicio: data.fecha_inicio,
                hora_inicio: data.hora_inicio,
                fecha_fin: data.fecha_fin,
                hora_fin: data.hora_fin,
                dia: data.dia,
                cantidad_horas: data.cantidad_horas,
                instructor: vinc.id_vinculacion, // Usar el id_vinculacion
                ficha: data.ficha,
                ambiente: data.ambiente,
                estado: data.estado
            }
        });

        return new NextResponse(JSON.stringify(horario), {
            headers: { "Content-Type": "application/json" },
            status: 201
        });
    } catch (error) {
        console.error("Error en POST:", error);
        return new NextResponse(error.message, { status: 500 });
    }
}


