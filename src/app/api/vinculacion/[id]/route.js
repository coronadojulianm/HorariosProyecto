import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const id = parseInt(params.id)
    console.log(id);
    try {
        const vinculacion = await prisma.vinculacion.findFirst({
            where: {id_vinculacion:id},
        });
        if(!vinculacion){
            return new NextResponse(`ID "${id}" de la vinculacion no encontrada`,{status:404})
        }
        return NextResponse.json(vinculacion)
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function DELETE(request,{params}){
    const id = parseInt(params.id)
    try {
        const resultado = await prisma.vinculacion.delete({
            where:{id_vinculacion:id}
        });
        return NextResponse.json({message:"Vinculacion eliminada con exito",resultado},{status:200});
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
        const registroExistente = await prisma.vinculacion.findUnique({
            where: { id_vinculacion: id },
        });
        if (!registroExistente) {
            return new NextResponse(`ID "${id}" de la vinculacion no encontrada para actualizar`, {
                status: 404,
            });
        }
        const resultado = await prisma.vinculacion.update({
            where: { id_vinculacion: id },
            data: data,
        });
        return NextResponse.json({ message:"Vinculacion actualizada con exito" ,resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
