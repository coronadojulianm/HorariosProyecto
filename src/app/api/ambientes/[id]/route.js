import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const id = parseInt(params.id)
    console.log(id);
    try {
        const ambientes = await prisma.ambientes.findFirst({
            where: {id_ambiente:id},
        });
        if(!ambientes){
            return new NextResponse(`ID "${id}" del ambiente no encontrada`,{status:404})
        }
        return NextResponse.json(ambientes)
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function DELETE(request,{params}){
    const id = parseInt(params.id)
    try {
        const resultado = await prisma.ambientes.delete({
            where:{id_ambiente:id}
        });
        return NextResponse.json({message:"Ambiente eliminado con exito",resultado},{status:200});
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
        const registroExistente = await prisma.ambientes.findUnique({
            where: { id_ambiente: id },
        });
        if (!registroExistente) {
            return new NextResponse(`ID "${id}" del ambiente no encontrado para actualizar`, {
                status: 404,
            });
        }
        const resultado = await prisma.ambientes.update({
            where: { id_ambiente: id },
            data: data,
        });
        return NextResponse.json({ message:"Ambiente actualizado con exito", resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}