import { Card } from 'antd';
import { MailOutlined, WhatsAppOutlined } from '@ant-design/icons'; 

function ContactCard() {
  return (
    
    <Card
      title="Ponte en contacto con nosotros" 
      style={{ 
        width: '100%', 
        maxWidth: 400, 
        margin: '20px auto', 
        borderRadius: '8px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
        backgroundColor: '#fff', 
      }}
      headStyle={{ 
        backgroundColor: '#0f3460', 
        color: '#ffffff',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
      bodyStyle={{ padding: '24px' }} 
    >
      <p style={{ marginBottom: '10px', fontSize: '1.1em' }}>
        <span style={{ fontWeight: 'bold', color: '#1a1a2e' }}>Diana Meri</span>
      </p>
      <p style={{ marginBottom: '15px', color: '#555' }}>
        Startup Valencia Programs Manager
      </p>
      <p style={{ marginBottom: '10px' }}>
        <MailOutlined style={{ marginRight: '8px', color: '#00BFFF' }} /> 
        <a href="mailto:diana@startupvalencia.org" style={{ color: '#00BFFF', textDecoration: 'none' }}>
          diana@startupvalencia.org
        </a>
      </p>
      <p>
        <WhatsAppOutlined style={{ marginRight: '8px', color: '#00BFFF' }} /> 
        <a href="https://wa.me/34627711114" target="_blank" rel="noopener noreferrer" style={{ color: '#00BFFF', textDecoration: 'none' }}>
          WhatsApp: +34 627 711 114
        </a>
      </p>
    </Card>
  );
}

export default ContactCard;