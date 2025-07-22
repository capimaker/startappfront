import { Card, Space, Typography, List, Divider } from 'antd';
import {
  EnvironmentOutlined,
  WifiOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  LinkOutlined,
  FormOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import './InfoCard.css';

const { Text, Link: AntLink } = Typography;

function InfoCard() {
  return (
    <Card
      title="Información General del Programa"
      className="info-card-container" // Clase para el contenedor principal
      styles={{
        header: {
          // Estos estilos se sobrescribirán en CSS con las variables
        },
        body: {
          // Estos estilos se sobrescribirán en CSS con las variables
        },
      }}
    >
      <Space direction="vertical" className="info-section">
        <Text strong className="section-title">
          <EnvironmentOutlined />
          Coworking La Harinera
        </Text>
        <List size="small" bordered={false} className="info-list">
          <List.Item className="info-list-item">
            <Text strong className="info-label">
              <EnvironmentOutlined className="info-icon" /> Dirección:
            </Text>
            <Text className="info-value">
              La Harinera (C/ de Joan Verdeguer, 116, Poblados Marítimos, 46024, Valencia)
            </Text>
          </List.Item>
          <List.Item className="info-list-item links-item">
            <Text strong className="info-label">
              <LinkOutlined className="info-icon" /> URLs de apoyo:
            </Text>
            <Space direction="vertical" className="info-links-group">
              <AntLink
                href="https://www.lasnaves.com/wp-content/uploads/2024/05/Uso-de-Espacios-y-Tarifas_compressed.pdf"
                target="_blank"
                className="info-link"
              >
                Web
              </AntLink>
              <AntLink
                href="https://drive.google.com/file/d/1nWBf4uclnRMoWAQVjBb1DNvB1_tH9sPk/view"
                target="_blank"
                className="info-link"
              >
                Manual de Bienvenida
              </AntLink>
              <AntLink
                href="https://drive.google.com/file/d/1OmPZuK65-P__WlZU2IhyQ6iJWbenIx3X/view?usp=drive_link"
                target="_blank"
                className="info-link"
              >
                Servicio de comidas
              </AntLink>
            </Space>
          </List.Item>
          <List.Item className="info-list-item">
            <Text strong className="info-label">
              <WifiOutlined className="info-icon" /> WiFi:
            </Text>
            <Text className="info-value">
              La Harinera - Password:{' '}
              <Text code className="wifi-password">
                VLCtech25+
              </Text>
            </Text>
          </List.Item>
        </List>
      </Space>

      <Divider className="info-divider" />

      <Space direction="vertical" className="info-section">
        <Text strong className="section-title">
          <ClockCircleOutlined />
          Horario de apertura:
        </Text>
        <List size="small" bordered={false} className="info-list">
          <List.Item className="info-list-item horizontal-item">
            <Text strong className="info-label">
              Lunes a viernes:
            </Text>
            <Text className="info-value">08:30 a 20:15 h</Text>
          </List.Item>

          <List.Item className="info-list-item horizontal-item">
            <Text strong className="info-label">
              Sábados, domingos y festivos:
            </Text>
            <Text className="info-value">Cerrado.</Text>
          </List.Item>
          <List.Item className="info-list-item">
            {' '}
            {/* Clase 'column-item' eliminada */}
            <Text strong className="info-label">
              Verano:
            </Text>
            <Text className="info-value">
              Del 11 al 24 de agosto del 2025 las instalaciones tanto de Las Naves como de La Harinera, permanecerán
              cerradas. Los días restantes de agosto, el horario de apertura será de 8:30 a 15:00 h.
            </Text>
          </List.Item>
        </List>
      </Space>

      <Divider className="info-divider" />

      <Space direction="vertical" className="info-section">
        <Text strong className="section-title">
          <FormOutlined />
          Reserva de salas:
        </Text>
        <List size="small" bordered={false} className="info-list">
          <List.Item className="info-list-item">
            <Text className="info-value">
              En la Planta Baja están disponibles las dos salas acristaladas (Sala de Reuniones 1 y Sala de Reuniones
              2).
            </Text>
          </List.Item>
          <List.Item className="info-list-item column-item">
            <Text strong className="info-label">
              Sistema de reservas online:
            </Text>
            <Space direction="vertical" className="info-links-group">
              <AntLink
                href="https://outlook.office365.com/book/ReservadeSalasHarinera@lasnaves.com/s/H8knsbeqf02-j_A41Ub15w2?ismsaljsauthenabled=true"
                target="_blank"
                className="info-link"
              >
                • Enlace de reserva de Sala 1
              </AntLink>
              <AntLink
                href="https://outlook.office365.com/book/ReservadeSalasHarinera@lasnaves.com/s/F5zmJdXC6U2IoJCALi-9vw2?ismsaljsauthenabled=true"
                target="_blank"
                className="info-link"
              >
                • Enlace de reserva de Sala 2
              </AntLink>
            </Space>
          </List.Item>
        </List>
      </Space>

      <Card
        type="inner"
        title={
          <Text strong type="warning" className="important-title">
            <InfoCircleOutlined /> Importante
          </Text>
        }
        className="important-card"
      >
        <Text className="important-text">
          Todas las personas que formen parte del programa deben estar registradas en este formulario. Se tienen que
          registrar todas las personas que tengan previsto venir a las formaciones y también todas las personas que
          quieran solicitar puesto de trabajo en La Harinera, vayan o no vayan a las formaciones.
        </Text>
      </Card>

      <Divider className="info-divider" />

      <Space direction="vertical" className="info-section">
        <Text strong className="section-title">
          <InfoCircleOutlined />
          Más info
        </Text>
        <List size="small" bordered={false} className="info-list">
          {/* Mover el enlace de WhatsApp al final del texto explicativo */}
          <List.Item className="info-list-item">
            <Text strong className="info-label">
              <MessageOutlined className="info-icon" /> Únete a la comunidad de WhatsApp:
            </Text>
            {/* El enlace de WhatsApp se movió aquí, dentro del info-value para que vaya al final del texto */}
            <Text className="info-value">
              Pueden unirse todos los integrantes que lo deseen de cada startup participante.{' '}
              <AntLink href="https://chat.whatsapp.com/Iv6Ep2IPd4Y9O2mtqyEAoc" target="_blank" className="info-link">
                (enlace)
              </AntLink>
            </Text>
          </List.Item>

          <List.Item className="info-list-item column-item contact-item">
            <Text strong className="info-label">
              Contacta con nosotros:
            </Text>
            <Space direction="vertical" className="contact-details">
              <Text strong>Diana Meri</Text>
              <Text>Startup Valencia Programs Manager</Text>
              <Text>
                <MailOutlined className="info-icon" />
                <AntLink href="mailto:diana@startupvalencia.org" className="info-link">
                  diana@startupvalencia.org
                </AntLink>
              </Text>
              <Text>
                <WhatsAppOutlined className="info-icon" />
                <AntLink
                  href="https://wa.me/34627711114"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-link"
                >
                  WhatsApp: +34 627 711 114
                </AntLink>
              </Text>
            </Space>
          </List.Item>
        </List>
      </Space>

      <Divider className="info-divider" />

      <Space direction="vertical" className="info-section">
        <Text strong className="section-title">
          <QuestionCircleOutlined />
          Q&A
        </Text>
        <List size="small" bordered={false} className="info-list">
          <List.Item className="info-list-item qa-item">
            <Text strong className="qa-question">
              ¿Cuántas personas pueden venir a las formaciones?
            </Text>
            <Text className="qa-answer">
              La sala de formación tiene 35 puestos disponibles por lo que podéis venir una o dos personas a cada
              sesión. Podéis venir 3 personas o más siempre que se dé prioridad de sentarse a un integrante de cada
              equipo. (Tenéis total libertad de subir más sillas a la sala si al terminar la sesión si las dejáis de
              nuevo en donde corresponde 😉 ).
            </Text>
          </List.Item>

          <List.Item className="info-list-item qa-item">
            <Text strong className="qa-question">
              ¿Tenemos que registrar previamente quiénes vamos a cada sesión?
            </Text>
            <Text className="qa-answer">
              No, con haber rellenado el formulario una sola vez es suficiente, no teneis que avisar quién va a cada
              formación, solo aseguraros de firmar la hoja de firmas para contar la asistencia.
            </Text>
          </List.Item>

          <List.Item className="info-list-item qa-item">
            <Text strong className="qa-question">
              ¿Se puede asistir online?
            </Text>
            <Text className="qa-answer">
              No. En este programa apostamos por la presencialidad. Recordad que se debe cumplir un mínimo del 80% de
              asistencia a las sesiones formativas.
            </Text>
          </List.Item>
        </List>
      </Space>
    </Card>
  );
}

export default InfoCard;
