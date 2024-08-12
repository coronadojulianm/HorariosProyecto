import prisma from "@/lib/prisma";

export async function GET(request) {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
  
    if (!name) {
      return new Response('Name parameter is required', { status: 400 });
    }
  
    try {
      const horarios = await prisma.horarios.findMany({
        where: {
          instructor: {
            in: (
              await prisma.vinculacion.findMany({
                where: {
                  instructor: {
                    in: (
                      await prisma.personas.findMany({
                        where: {
                          nombres: name,
                        },
                        select: { id_persona: true },
                      })
                    ).map(persona => persona.id_persona),
                  },
                },
              })
            ).map(vinculacion => vinculacion.id_vinculacion),
          },
        },
      });
  
      return new Response(JSON.stringify(horarios), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response('Error fetching horarios', { status: 500 });
    }
  }