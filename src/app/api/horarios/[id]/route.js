import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const id = parseInt(params.id)
    console.log(id);
    try {
        const horarios = await prisma.horarios.findFirst({
            where: {id_horario:id},
        });
        if(!horarios){
            return new NextResponse(`ID "${id}" del horario no encontrada`,{status:404})
        }
        return NextResponse.json(horarios)
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function DELETE(request,{params}){
    const id = parseInt(params.id)
    try {
        const resultado = await prisma.horarios.delete({
            where:{id_horario:id}
        });
        return NextResponse.json({message:"horario eliminado con exito",resultado},{status:200});
    } catch (error) {
        return new NextResponse(error.message,{status:500});
    }
}
export async function PUT(request,{params}){
        console.log(params);
    const id = parseInt(params.id)
    const data = await request.json()
    try {
        const resultado = await prisma.horarios.update({
            where: {id_horario:id},
            data:data
        })
        if(!resultado){
            return new NextResponse(`ID "${id}" del horario no encontrada`,{
                status:404,
            });
        }
        return NextResponse.json({message:resultado},{status:200})
    } catch (error) {
        return new NextResponse(error.message,{status:500});
    }
}