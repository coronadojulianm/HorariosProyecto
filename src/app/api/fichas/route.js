import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const fichas = await prisma.fichas.findMany({
            include: {
                Programas: true, // Incluye datos de programas si es necesario
            },
        });
        return NextResponse.json({ data: fichas }, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const fichas = await prisma.fichas.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(fichas),{
            headers:{"Content-Type":"application/json"},
            status:201
        })          
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}