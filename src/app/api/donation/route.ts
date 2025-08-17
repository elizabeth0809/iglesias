// app/api/donation/route.ts

import EmailTemplateDonation from "@/components/emailTemplateDonation";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, monto, comentario } = body;

    // Validação dos campos obrigatórios
    if (!nome || !monto) {
      return NextResponse.json(
        {
          message: "Nome e valor são obrigatórios",
          fields: { nome, monto, comentario }
        },
        { status: 400 }
      );
    }

    // Validações adicionais
    if (nome.length < 2) {
      return NextResponse.json(
        { message: "Nome deve ter pelo menos 2 caracteres" },
        { status: 400 }
      );
    }

    if (typeof monto !== 'number' || monto <= 0) {
      return NextResponse.json(
        { message: "Valor deve ser um número maior que zero" },
        { status: 400 }
      );
    }

    // Formatação do valor para exibição
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(monto);

    const { data, error } = await resend.emails.send({
      from: "Igreja Doações <onboarding@resend.dev>", // Ajuste conforme necessário
      to: ["kervisvasquez24@gmail.com"], // Substitua pelo email da tesouraria
      subject: `Nova Doação Registrada - ${nome} - ${valorFormatado}`,
      react: await EmailTemplateDonation({
        nome,
        monto: valorFormatado,
        comentario: comentario || "Nenhum comentário adicionado",
      }),
    });

    if (error) {
      console.error("Erro do Resend:", error);
      return NextResponse.json(
        {
          message: "Erro ao enviar notificação por email",
          error: error
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Doação registrada com sucesso",
      data: data,
      donation: {
        nome,
        valor: valorFormatado,
        comentario: comentario || null,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error("Erro interno:", error);
    return NextResponse.json(
      {
        message: "Erro interno do servidor",
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS (opcional)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}