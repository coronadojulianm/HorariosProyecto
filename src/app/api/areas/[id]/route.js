import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const id = parseInt(params.id)
    console.log(id);
    try {
        const areas = await prisma.areas.findFirst({
            where: {id_area:id},
        });
        if(!areas){
            return new NextResponse(`ID "${id}" del area no encontrada`,{status:404})
        }
        return NextResponse.json(areas)
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function DELETE(request,{params}){
    const id = parseInt(params.id)
    try {
        const resultado = await prisma.areas.delete({
            where:{id_area:id}
        });
        return NextResponse.json({message:"Area eliminada con exito",resultado},{status:200});
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
        const registroExistente = await prisma.areas.findUnique({
            where: { id_area: id },
        });
        if (!registroExistente) {
            return new NextResponse(`ID "${id}" del area no encontrada para actualizar`, {
                status: 404,
            });
        }
        const resultado = await prisma.areas.update({
            where: { id_area: id },
            data: data,
        });
        return NextResponse.json({ message:"Area actualizada con exito", resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}