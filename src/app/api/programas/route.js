import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const programas = await prisma.programas.findMany();
        return NextResponse.json({ data: programas }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const programas = await prisma.programas.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(programas),{
            headers:{"Content-Type":"application/json"},
            status:201
        })          
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}