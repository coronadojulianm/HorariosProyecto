import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const id = parseInt(params.id);
    console.log("GET ID:", id);
    try {
        const horarios = await prisma.horarios.findFirst({
            where: { id_horario: id },
        });
        if (!horarios) {
            return new NextResponse(`ID "${id}" del horario no encontrada`, { status: 404 });
        }
        return NextResponse.json(horarios);
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id);
    console.log("DELETE ID:", id);
    try {
        const resultado = await prisma.horarios.delete({
            where: { id_horario: id }
        });
        return NextResponse.json({ message: "Horario eliminado con éxito", resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id);
    const data = await request.json();
    
    console.log("PUT ID:", id);
    console.log("Request Data:", data);

    if (isNaN(id)) {
        return new NextResponse("ID no válido", { status: 400 });
    }

    try {
        const registroExistente = await prisma.horarios.findUnique({
            where: { id_horario: id },
        });
        if (!registroExistente) {
            return new NextResponse(`ID "${id}" del horario no encontrada para actualizar`, { status: 404 });
        }

        const resultado = await prisma.horarios.update({
            where: { id_horario: id },
            data: data,
        });
        return NextResponse.json({ message: "Horario actualizado con éxito", resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
