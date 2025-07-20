import { Form, Input, Button, DatePicker, TimePicker, Select, message, Typography, Card, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createSession, reset } from '../../features/sessions/sessionSlice';
import './MentorshipSessionForm.css';

const { Title } = Typography;
const { Option } = Select;

const MentorshipSessionForm = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, message: errorMessage } = useSelector((state) => state.sessions);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const dateTime = dayjs(values.date).hour(values.time.hour()).minute(values.time.minute()).second(0).toISOString();

    const payload = {
      mentor: values.mentor,
      mentee: values.mentee,
      date: dateTime,
      duration: values.duration,
      topic: values.topic,
      notes: values.notes,
    };

    dispatch(createSession(payload));
    dispatch(reset());
    form.resetFields();
    message.success('Sesión creada correctamente');
  };

  return (
    <div className="form-container">
      <Card title="Agendar Mentoría" variant="borderless">
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="mentor"
                label="Mentor"
                rules={[{ required: true, message: 'Introduce el ID del mentor' }]}
              >
                <Input placeholder="Id del mentor" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="mentee" label="Startup" rules={[{ required: true, message: 'Introduce la Startup' }]}>
                <Input placeholder="Id de la Startup" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="date" label="Fecha" rules={[{ required: true, message: 'Selecciona la fecha' }]}>
                <DatePicker className="full-width" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="time" label="Hora" rules={[{ required: true, message: 'Selecciona la hora' }]}>
                <TimePicker className="full-width" format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="duration"
                label="Duración"
                rules={[{ required: true, message: 'Selecciona la duración' }]}
              >
                <Select placeholder="Duración">
                  <Option value="30">30 min</Option>
                  <Option value="45">45 min</Option>
                  <Option value="60">1 hora</Option>
                  <Option value="90">1h 30min</Option>
                  <Option value="90">2h</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="topic" label="Tema" rules={[{ required: true, message: 'Introduce el tema' }]}>
            <Input placeholder="Tema de la mentoría" />
          </Form.Item>

          <Form.Item name="notes" label="Notas adicionales">
            <Input.TextArea rows={4} placeholder="Notas u observaciones" style={{ resize: 'none' }} maxLength={250} />
          </Form.Item>

          <Form.Item>
            <Button className="mentorship__btn" type="primary" htmlType="submit" block loading={isLoading}>
              Crear Mentoría
            </Button>
          </Form.Item>

          {isError && <p className="error-text">{errorMessage}</p>}
        </Form>
      </Card>
    </div>
  );
};

export default MentorshipSessionForm;
