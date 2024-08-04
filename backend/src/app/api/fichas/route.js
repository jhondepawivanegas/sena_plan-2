import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
  return new NextResponse(error.message, { status: 500 });
};

export async function GET() {
  try {
    const fichas = await prisma.fichas.findMany({
      include: {
        Programas: {
          select: {
            nombre_programa: true,
            sigla: true,
          }
        }
      },
    });
    return NextResponse.json({ datos: fichas }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request) {
    try {
      const data = await request.json();
      const ficha = await prisma.fichas.create({
        data: {
          codigo: Number(data.codigo),
          inicio_fecha: new Date(data.inicio_fecha),
          fin_lectiva: new Date(data.fin_lectiva),
          fin_ficha: new Date(data.fin_ficha),
          programa: Number(data.programa), // Pass the id_programa value directly
          sede: data.sede,
          estado: data.estado,
        },
      });
      return new NextResponse(JSON.stringify(ficha), {
        headers: { "Content-Type": "application/json" },
        status: 201,
      });
    } catch (error) {
      return handleErrors(error);
    }
  }