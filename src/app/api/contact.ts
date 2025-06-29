import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { EmailTemplate } from "../components/emailTemplate";


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, whatsapp, descricao } = req.body;

  // Validação dos campos obrigatórios
  if (!nome || !whatsapp || !descricao) {
    return res.status(400).json({ 
      message: "Todos os campos são obrigatórios",
      fields: { nome, whatsapp, descricao }
    });
  }

  // Validações adicionais
  if (nome.length < 2) {
    return res.status(400).json({ message: "Nome deve ter pelo menos 2 caracteres" });
  }

  if (descricao.length < 10) {
    return res.status(400).json({ message: "Descrição deve ter pelo menos 10 caracteres" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Igreja <onboarding@resend.dev>", // Ajuste conforme necessário
      to: ["kervisvasquez24@gmail.com"],
      subject: `Nova mensagem de contato - ${nome}`,
      react: await Promise.resolve(EmailTemplate({
        nome,
        whatsapp,
        descricao,
      })),
    });

    if (error) {
      console.error("Erro do Resend:", error);
      return res.status(400).json({ 
        message: "Erro ao enviar email",
        error: error
      });
    }

    res.status(200).json({ 
      message: "Email enviado com sucesso",
      data: data
    });
    
  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({ 
      message: "Erro interno do servidor",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}