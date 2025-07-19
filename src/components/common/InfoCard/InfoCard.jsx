// src/components/common/InfoCard/InfoCard.jsx

import { Card, Space, Typography, List, Divider } from 'antd';
import { 
  EnvironmentOutlined, WifiOutlined, ClockCircleOutlined, CalendarOutlined,
  LinkOutlined, FormOutlined, InfoCircleOutlined, MessageOutlined, QuestionCircleOutlined,
  MailOutlined, WhatsAppOutlined 
} from '@ant-design/icons';

const { Text, Link: AntLink } = Typography; 

function InfoCard() {
  const primaryColor = '#0f3460'; 
  const accentColor = '#00BFFF'; 
  const textColor = '#333'; 
  const lightBg = '#f9f9f9'; 

  return (
    <Card
      title="Información General del Programa"
      style={{ 
        width: '100%', 
        maxWidth: 800, 
        margin: '20px auto', 
        borderRadius: '8px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
      headStyle={{ 
        backgroundColor: primaryColor, 
        color: '#ffffff', 
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        fontSize: '1.5em',
        padding: '16px 24px'
      }}
      bodyStyle={{ padding: '24px', color: textColor }}
    >
     
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: '1.2em', color: primaryColor }}>
          <EnvironmentOutlined style={{ marginRight: '8px' }} />Coworking La Harinera
        </Text>
        <List size="small" bordered={false} style={{ backgroundColor: lightBg, borderRadius: '6px', padding: '10px' }}>
          <List.Item>
            <Text strong><EnvironmentOutlined style={{ color: accentColor }} /> Dirección:</Text>
            <Text> La Harinera (C/ de Joan Verdeguer, 116, Poblados Marítimos, 46024, Valencia)</Text>
          </List.Item>
          <List.Item>
            <Text strong><LinkOutlined style={{ color: accentColor }} /> URLs de apoyo:</Text>
            <Space direction="vertical" style={{width: 'auto'}}>
              <AntLink href="#" target="_blank" style={{ color: accentColor }}>Web</AntLink>
              <AntLink href="#" target="_blank" style={{ color: accentColor }}>Manual de Bienvenida</AntLink>
              <AntLink href="#" target="_blank" style={{ color: accentColor }}>Servicio de comidas</AntLink>
            </Space>
          </List.Item>
          <List.Item>
            <Text strong><WifiOutlined style={{ color: accentColor }} /> WiFi:</Text>
            <Text> La Harinera - Password: <Text code>VLCtech25+</Text></Text>
          </List.Item>
        </List>
      </Space>

      <Divider />

     
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: '1.2em', color: primaryColor }}>
          <ClockCircleOutlined style={{ marginRight: '8px' }} />Horario de apertura:
        </Text>
        <List size="small" bordered={false} style={{ backgroundColor: lightBg, borderRadius: '6px', padding: '10px' }}>
          <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text strong>Lunes a viernes:</Text>
            <Text style={{ marginRight:"500px" }}> 08:30 a 20:15 h</Text> 
          </List.Item>

          <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text strong>Sábados, domingos y festivos:</Text>
            <Text style={{ marginRight:"200px", flexGrow: 1 }}> Cerrado.</Text>
          </List.Item>
          <List.Item>
            <Text strong><CalendarOutlined style={{ color: accentColor }} /> Verano:</Text>
            <Text> Del 11 al 24 de agosto del 2025 las instalaciones tanto de Las Naves como de La Harinera, permanecerán cerradas.</Text>
          </List.Item>
          <List.Item>
            <Text>Los días restantes de agosto, el horario de apertura será de 8:30 a 15:00 h.</Text>
          </List.Item>
        </List>
      </Space>

      <Divider />

     
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: '1.2em', color: primaryColor }}>
          <FormOutlined style={{ marginRight: '8px' }} />Reserva de salas:
        </Text>
        <List size="small" bordered={false} style={{ backgroundColor: lightBg, borderRadius: '6px', padding: '10px' }}>
          <List.Item>
            <Text>En la Planta Baja están disponibles las dos salas acristaladas (Sala de Reuniones 1 y Sala de Reuniones 2).</Text>
          </List.Item>
          <List.Item>
            <Text strong>Sistema de reservas online:</Text>
            <Space direction="vertical" style={{width: '100%'}}>
              <AntLink href="#" target="_blank" style={{ color: accentColor }}>• Enlace de reserva de Sala 1</AntLink>
              <AntLink href="#" target="_blank" style={{ color: accentColor }}>• Enlace de reserva de Sala 2</AntLink>
            </Space>
          </List.Item>
        </List>
      </Space>

     
      <Card 
        type="inner" 
        title={<Text strong type="warning"><InfoCircleOutlined style={{ marginRight: '8px' }} /> Importante</Text>}
        style={{ marginTop: '20px', borderColor: '#faad14', backgroundColor: '#fffbe6' }} 
        headStyle={{ backgroundColor: '#fffbe6', borderBottom: '1px solid #faad14' }}
      >
        <Text>
          Todas las personas que formen parte del programa deben estar registradas en este formulario.
          Se tienen que registrar todas las personas que tengan previsto venir a las formaciones y también todas las personas que quieran solicitar puesto de trabajo en La Harinera, vayan o no vayan a las formaciones.
        </Text>
      </Card>

      <Divider />

      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: '1.2em', color: primaryColor }}>
          <InfoCircleOutlined style={{ marginRight: '8px' }} />Más info
        </Text>
        <List size="small" bordered={false} style={{ backgroundColor: lightBg, borderRadius: '6px', padding: '10px' }}>
          <List.Item>
            <Text strong><MessageOutlined style={{ color: accentColor }} /> Únete a la comunidad de WhatsApp:</Text>
            <AntLink href="#" target="_blank" style={{ color: accentColor }}>enlace</AntLink>
          </List.Item>
          <List.Item>
            <Text>Será el único canal de comunicación directa del programa además del email. Pueden unirse todos los integrantes que lo deseen de cada startup participante.</Text>
          </List.Item>
          <List.Item>
            <Text strong>Si tienes más preguntas, ponte en contacto con nosotros:</Text>
            <Space direction="vertical">
              <Text strong>Diana Meri</Text>
              <Text>Startup Valencia Programs Manager</Text>
              <Text><MailOutlined style={{ marginRight: '8px', color: accentColor }} />
                <AntLink href="mailto:diana@startupvalencia.org" style={{ color: accentColor }}>diana@startupvalencia.org</AntLink>
              </Text>
              <Text><WhatsAppOutlined style={{ marginRight: '8px', color: accentColor }} />
                <AntLink href="https://wa.me/34627711114" target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>WhatsApp: +34 627 711 114</AntLink>
              </Text>
            </Space>
          </List.Item>
        </List>
      </Space>

      <Divider />

    
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong style={{ fontSize: '1.2em', color: primaryColor }}>
          <QuestionCircleOutlined style={{ marginRight: '8px' }} />Q&A
        </Text>
        <List size="small" bordered={false} style={{ backgroundColor: lightBg, borderRadius: '6px', padding: '10px' }}>
          <List.Item>
            <Text strong>¿Cuántas personas pueden venir a las formaciones?</Text>
            <Text>La sala de formación tiene 35 puestos disponibles por lo que podéis venir una o dos personas a cada sesión. Podéis venir 3 personas o más siempre que se dé prioridad de sentarse a un integrante de cada equipo. (Tenéis total libertad de subir más sillas a la sala si al terminar la sesión si las dejáis de nuevo en donde corresponde 😉 ).</Text>
          </List.Item>
          <List.Item>
            <Text strong>¿Tenemos que registrar previamente quiénes vamos a cada sesión?</Text>
            <Text>No, con haber rellenado el formulario una sola vez es suficiente, no teneis que avisar quién va a cada formación, solo aseguraros de firmar la hoja de firmas para contar la asistencia.</Text>
          </List.Item>
          <List.Item>
            <Text strong>¿Se puede asistir online?</Text>
            <Text>No. En este programa apostamos por la presencialidad. Recordad que se debe cumplir un mínimo del 80% de asistencia a las sesiones formativas.</Text>
          </List.Item>
        </List>
      </Space>

    </Card>
  );
}

export default InfoCard;
