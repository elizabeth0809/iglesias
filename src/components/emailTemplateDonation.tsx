// app/components/emailTemplateDonation.tsx
import React from 'react';

interface EmailTemplateDonationProps {
  nome: string;
  monto: string;
  comentario: string;
}

export const EmailTemplateDonation: React.FC<EmailTemplateDonationProps> = ({
  nome,
  monto,
  comentario,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#d97706',
        color: 'white',
        padding: '20px',
        borderRadius: '8px 8px 0 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0', fontSize: '24px' }}>💝 Nova Doação Registrada</h1>
        <p style={{ margin: '5px 0 0 0', opacity: '0.9' }}>Igreja Batista Renovada Sonho de Deus</p>
      </div>

      {/* Content */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        border: '1px solid #e5e7eb',
        borderTop: 'none'
      }}>
        <h2 style={{ color: '#1f2937', marginTop: '0' }}>Detalhes da Doação:</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{
              padding: '12px 0',
              borderBottom: '1px solid #f3f4f6',
              fontWeight: 'bold',
              width: '120px'
            }}>
              👤 Nome:
            </td>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
              {nome}
            </td>
          </tr>
          <tr>
            <td style={{
              padding: '12px 0',
              borderBottom: '1px solid #f3f4f6',
              fontWeight: 'bold'
            }}>
              💰 Valor:
            </td>
            <td style={{ 
              padding: '12px 0', 
              borderBottom: '1px solid #f3f4f6',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#059669'
            }}>
              {monto}
            </td>
          </tr>
          <tr>
            <td style={{
              padding: '12px 0',
              borderBottom: '1px solid #f3f4f6',
              fontWeight: 'bold'
            }}>
              📅 Data/Hora:
            </td>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
              {new Date().toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </td>
          </tr>
          {comentario && comentario !== "Nenhum comentário adicionado" && (
            <tr>
              <td style={{
                padding: '12px 0',
                fontWeight: 'bold',
                verticalAlign: 'top'
              }}>
                💬 Comentário:
              </td>
              <td style={{ padding: '12px 0' }}>
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '15px',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb'
                }}>
                  {comentario}
                </div>
              </td>
            </tr>
          )}
        </table>
      </div>

      {/* Versículo Bíblico */}
      <div style={{
        backgroundColor: '#dbeafe',
        padding: '20px',
        border: '1px solid #e5e7eb',
        borderTop: 'none',
        borderLeft: '4px solid #3b82f6'
      }}>
     <p style={{
  margin: '0 0 10px 0',
  fontStyle: 'italic',
  color: '#1e40af',
  fontSize: '16px'
}}>
  &ldquo;Que cada um dê como propôs em seu coração, não de mala gana nem por obrigação, porque Deus ama ao dador alegre.&rdquo;
</p>
        <p style={{
          margin: '0',
          textAlign: 'right',
          fontWeight: 'bold',
          color: '#64748b',
          fontSize: '14px'
        }}>
          2 Coríntios 9:7
        </p>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '0 0 8px 8px',
        border: '1px solid #e5e7eb',
        borderTop: 'none',
        textAlign: 'center'
      }}>
        <p style={{
          margin: '0 0 10px 0',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          🙏 Esta é uma notificação automática de registro de doação.
        </p>
        <p style={{
          margin: '0',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          Por favor, confirme o recebimento e registre no sistema financeiro da igreja.
        </p>
      </div>
    </div>
  </div>
);

export default EmailTemplateDonation;