import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const id = parseInt(params.id)
    console.log(id);
    try {
        const programas = await prisma.programas.findFirst({
            where: {id_programa:id},
        });
        if(!programas){
            return new NextResponse(`ID "${id}" del programa no encontrada`,{status:404})
        }
        return NextResponse.json(programas)
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function DELETE(request,{params}){
    const id = parseInt(params.id)
    try {
        const resultado = await prisma.programas.delete({
            where:{id_programa:id}
        });
        return NextResponse.json({message:"Programa eliminado con exito",resultado},{status:200});
    } catch (error) {
        return new NextResponse(error.message,{status:500});
    }
}
export async function PUT(request, { params }) {
    console.log(params);
    const id = parseInt(params.id);
    const data = await request.json();
    console.log("Request Data: ", data);

    try {
        const registroExistente = await prisma.programas.findUnique({
            where: { id_programa: id },
        });
        if (!registroExistente) {
            return new NextResponse(`ID "${id}" del programa no encontrada para actualizar`, {
                status: 404,
            });
        }
        const resultado = await prisma.programas.update({
            where: { id_programa: id },
            data: data,
        });
        return NextResponse.json({ message:"Programa actualizado con exito", resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}