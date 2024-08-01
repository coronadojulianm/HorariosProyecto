import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const municipios = await prisma.municipios.findMany();
        return NextResponse.json({data:municipios}, {status:200})
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const municipios = await prisma.municipios.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(municipios),{
            headers:{"Content-Type":"application/json"},
            status:201
        })          
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}