import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
return new NextResponse(error.message, { status: 500 });
};

export async function GET(request, { params }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id) || id <= 0) {
        return NextResponse.json({ error: 'ID de area inválido' }, { status: 400 });
      }
  
      const area = await prisma.areas.findUnique({
        where: { id_area: parseInt(params.id)},
        include: {

        },
      });
  
      if (!area) {
        return NextResponse.json({ error: 'Area no encontrada' }, { status: 404 });
      }
  
      return NextResponse.json(area);
    } catch (error) {
      return handleErrors(error);
    }
  }

  export async function DELETE(request, { params }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)){
        return NextResponse.json({ error: 'ID de area inválido' }, { status: 400 });
      }
      const area = await prisma.areas.delete({
        where: { id_area: parseInt(params.id) },
      })
      return NextResponse.json({ message: "Area eliminada",area }, { status: 200 });
    } catch (error) {
      return handleErrors(error);
    }
  }

export async function PUT(request, { params }) {
try {
    const id = parseInt(params.id);
    const data = await request.json();
    const updatedArea = await prisma.areas.update({
    where: { id_area: parseInt(params.id) },
    data: {
        nombre_area: data.nombre_area,
    },
    });
    return NextResponse.json({ message: "Area Actualizada", area: updatedArea }, { status: 200 });
} catch (error) {
    return handleErrors(error);
}
}