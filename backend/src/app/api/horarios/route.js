import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
  return new NextResponse(error.message, { status: 500 });
};

// Función para transformar fechas al formato ISO 8601
function transformDate(date, time) {
  // Combina la fecha y hora y convierte a un objeto Date
  const dateTime = new Date(`${date}T${time}:00`);
  // Retorna la fecha en formato ISO 8601
  return dateTime.toISOString();
}

export async function GET() {
  try {
    const horarios = await prisma.horarios.findMany({
      include: {
        Fichas: { // Incluir la relación con la tabla Fichas
          select: {
            programa: true, // Asegúrate de que este es el campo correcto que deseas mostrar
          },
        },
        
        Ambientes: { // Incluir la relación con la tabla Ambientes
          select: {
            nombre_amb: true,
            estado: true, // Asegúrate de que este es el campo correcto que deseas mostrar
          },
        },
      },
    });
    return NextResponse.json({ datos: horarios }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Transforma las fechas y horas al formato ISO 8601
    const fechaInicioISO = transformDate(data.fecha_inicio, data.hora_inicio);
    const fechaFinISO = transformDate(data.fecha_fin, data.hora_fin);

    // Verificar si el ambiente está activo
    const ambiente = await prisma.ambientes.findUnique({
      where: {
        id_ambiente: data.ambiente,
      },
    });

    if (ambiente.estado !== "activo") {
      return new NextResponse(
        JSON.stringify({ error: "El ambiente seleccionado no está activo." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verificar si ya existe un horario con el mismo instructor, ficha y bloque del día
    const existingHorario = await prisma.horarios.findFirst({
      where: {
        instructor: data.instructor,
        ficha: data.ficha,
        dia: data.dia,
        hora_inicio: data.hora_inicio,
        hora_fin: data.hora_fin,
      },
    });

    if (existingHorario) {
      return new NextResponse(
        JSON.stringify({
          error:
            "Este horario ya existe para el instructor en la misma ficha y bloque del día.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const horario = await prisma.horarios.create({
      data: {
        fecha_inicio: fechaInicioISO,
        hora_inicio: data.hora_inicio,
        fecha_fin: fechaFinISO,
        hora_fin: data.hora_fin,
        dia: data.dia,
        cantidad_horas: parseInt(data.cantidad_horas),
        instructor: data.instructor,
        ficha: data.ficha,
        ambiente: data.ambiente,
      },
    });

    return new NextResponse(JSON.stringify(horario), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return handleErrors(error);
  }
}
