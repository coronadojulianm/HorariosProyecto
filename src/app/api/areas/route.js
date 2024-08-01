import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const areas = await prisma.areas.findMany();
        return NextResponse.json({data:areas}, {status:200})
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const areas = await prisma.areas.create(({
            data:data
        }))
        return new NextResponse(JSON.stringify(areas),{
            headers:{"Content-Type":"application/json"},
            status:201
        })          
    } catch (error) {
        return new NextResponse(error.message,{status:500})
    }
}