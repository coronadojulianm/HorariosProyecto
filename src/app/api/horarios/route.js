import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const data = await request.json()
        const horarios = await prisma.horarios.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(horarios),{
            headers:{"Content-Type":"application/json"},
            status:201
        })          
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function GET(){
    try {
        const horarios = await prisma.horarios.findMany();
        return NextResponse.json({data:horarios}, {status:200})
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}