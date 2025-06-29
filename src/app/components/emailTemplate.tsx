import React from 'react';

interface EmailTemplateProps {
  nome: string;
  whatsapp: string;
  descricao: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  nome,
  whatsapp,
  descricao,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#2563eb', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px 8px 0 0',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0', fontSize: '24px' }}>Nova Mensagem de Contato</h1>
        <p style={{ margin: '5px 0 0 0', opacity: '0.9' }}>Igreja - Website</p>
      </div>

      {/* Content */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '30px', 
        border: '1px solid #e5e7eb',
        borderTop: 'none'
      }}>
        <h2 style={{ color: '#1f2937', marginTop: '0' }}>Informações do Contato:</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr>
            <td style={{ 
              padding: '12px 0', 
              borderBottom: '1px solid #f3f4f6',
              fontWeight: 'bold',
              width: '120px'
            }}>
              Nome:
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
              WhatsApp:
            </td>
            <td style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
              <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} 
                 style={{ color: '#059669', textDecoration: 'none' }}>
                {whatsapp}
              </a>
            </td>
          </tr>
          <tr>
            <td style={{ 
              padding: '12px 0',
              fontWeight: 'bold',
              verticalAlign: 'top'
            }}>
              Mensagem:
            </td>
            <td style={{ padding: '12px 0' }}>
              <div style={{ 
                backgroundColor: '#f9fafb', 
                padding: '15px', 
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                {descricao}
              </div>
            </td>
          </tr>
        </table>
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
          margin: '0', 
          fontSize: '14px', 
          color: '#6b7280' 
        }}>
          Mensagem enviada através do site da igreja<br/>
          <em>Responda o mais breve possível</em>
        </p>
      </div>
    </div>
  </div>
);