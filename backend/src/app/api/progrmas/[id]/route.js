import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
return new NextResponse(error.message, { status: 500 });
};

const handleNotFound = () => {
return new NextResponse("Ficha not found", { status: 404 });
};

export async function GET(request, { params }) {
try {
    const programa = await prisma.programas.findFirst({
    include: {

    },
    });
    if (!programa) {
    return handleNotFound();
    }
    return NextResponse.json(programa);
} catch (error) {
    return handleErrors(error);
}
}

export async function DELETE(request, { params }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)){
        return NextResponse.json({ error: 'ID del programa inválido' }, { status: 400 });
      }
      const programa = await prisma.programas.delete({
        where: { id_programa: parseInt(params.id) },
      })
      return NextResponse.json({ message: "Programa eliminado",programa }, { status: 200 });
    } catch (error) {
      return handleErrors(error);
    }
  }

  export async function PUT(request, { params }) {
    try {
        const id = parseInt(params.id);
        const data = await request.json();
        const updatedPrograma = await prisma.programas.update({
        where: { id_programa: parseInt(params.id) },
        data: {
            nombre_programa: Number(data.nombre_programa),
            sigla: data.sigla,
            nivel: data. nivel,
            estado: data.estado,
        },
        });
        return NextResponse.json({ message: "Programa Actualizado", programa: updatedPrograma }, { status: 200 });
    } catch (error) {
        return handleErrors(error);
    }
    }