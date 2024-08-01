import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const ambientes = await prisma.ambientes.findMany();
        return NextResponse.json({data:ambientes}, {status:200})
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const ambientes = await prisma.ambientes.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(ambientes),{
            headers:{"Content-Type":"application/json"},
            status:201
        })          
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}