import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const id = parseInt(params.id)
    console.log(id);
    try {
        const fichas = await prisma.fichas.findFirst({
            where: {codigo:id},
        });
        if(!fichas){
            return new NextResponse(`ID "${id}" de la ficha no encontrada`,{status:404})
        }
        return NextResponse.json(fichas)
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function DELETE(request,{params}){
    const id = parseInt(params.id)
    try {
        const resultado = await prisma.fichas.delete({
            where:{codigo:id}
        });
        return NextResponse.json({message:"Ficha eliminado con exito",resultado},{status:200});
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
        const registroExistente = await prisma.fichas.findUnique({
            where: { codigo: id },
        });
        if (!registroExistente) {
            return new NextResponse(`ID "${id}" de la ficha no encontrada para actualizar`, {
                status: 404,
            });
        }
        const resultado = await prisma.fichas.update({
            where: { codigo: id },
            data: data,
        });
        return NextResponse.json({ message:"Ficha actualizada con exito", resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}