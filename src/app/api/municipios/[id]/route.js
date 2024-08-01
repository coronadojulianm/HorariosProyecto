import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const id = parseInt(params.id)
    console.log(id);
    try {
        const municipios = await prisma.municipios.findFirst({
            where: {id_municipio:id},
        });
        if(!municipios){
            return new NextResponse(`ID "${id}" del municipio no encontrada`,{status:404})
        }
        return NextResponse.json(municipios)
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function DELETE(request,{params}){
    const id = parseInt(params.id)
    try {
        const resultado = await prisma.municipios.delete({
            where:{id_municipio:id}
        });
        return NextResponse.json({message:"Municipio eliminado con exito",resultado},{status:200});
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
        const registroExistente = await prisma.municipios.findUnique({
            where: { id_municipio: id },
        });
        if (!registroExistente) {
            return new NextResponse(`ID "${id}" del Municipio no encontrada para actualizar`, {
                status: 404,
            });
        }
        const resultado = await prisma.municipios.update({
            where: { id_municipio: id },
            data: data,
        });
        return NextResponse.json({ message:"Municipio actualizado con exito", resultado }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}