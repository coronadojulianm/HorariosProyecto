import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const vinculacion = await prisma.vinculacion.findMany();
        return NextResponse.json({data:vinculacion}, {status:200})
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const vinculacion = await prisma.vinculacion.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(vinculacion),{
            headers:{"Content-Type":"application/json"},
            status:201
        })          
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}