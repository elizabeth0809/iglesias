// app/api/contact/route.ts
import { EmailTemplate } from "@/app/components/emailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, whatsapp, descricao } = body;

    // Validação dos campos obrigatórios
    if (!nome || !whatsapp || !descricao) {
      return NextResponse.json(
        { 
          message: "Todos os campos são obrigatórios",
          fields: { nome, whatsapp, descricao }
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

    if (descricao.length < 10) {
      return NextResponse.json(
        { message: "Descrição deve ter pelo menos 10 caracteres" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Igreja <onboarding@resend.dev>", // Ajuste conforme necessário
      to: ["kervisvasquez24@gmail.com"],
      subject: `Nova mensagem de contato - ${nome}`,
      react: await EmailTemplate({
        nome,
        whatsapp,
        descricao,
      }),
    });

    if (error) {
      console.error("Erro do Resend:", error);
      return NextResponse.json(
        { 
          message: "Erro ao enviar email",
          error: error
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      message: "Email enviado com sucesso",
      data: data
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