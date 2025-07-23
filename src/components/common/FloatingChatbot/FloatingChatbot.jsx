
import { useState, useRef, useEffect } from 'react';
import { Input, Button, Space, Typography, Card, Spin, Avatar } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, MessageOutlined, CloseOutlined } from '@ant-design/icons';
import logo_morado from '../../../assets/logo_morado.png';

const { Text } = Typography;
const { TextArea } = Input;

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false); 
  const [messages, setMessages] = useState([]); 
  const [inputMessage, setInputMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const messagesEndRef = useRef(null); 
  
  useEffect(() => {
    if (isOpen) { 
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);


  const callGeminiApi = async (chatHistory) => {
    try {
      const payload = { contents: chatHistory };
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error:", errorData);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
      } else {
        console.warn("Unexpected Gemini API response structure:", result);
        return "Lo siento, no pude generar una respuesta. Inténtalo de nuevo.";
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return `Hubo un error al comunicarse con el chatbot: ${error.message}.`;
    }
  };


  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = { role: 'user', parts: [{ text: inputMessage.trim() }] };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages); 
    setInputMessage(''); 
    setIsLoading(true); 

    try {
      
      const apiChatHistory = updatedMessages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model', 
        parts: msg.parts
      }));

      const botResponseText = await callGeminiApi(apiChatHistory);

      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'model', parts: [{ text: botResponseText }] } 
      ]);
    } catch (error) {
      console.error("Error handling message:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'model', parts: [{ text: "Lo siento, hubo un problema al procesar tu solicitud." }] }
      ]);
    } finally {
      setIsLoading(false); 
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      handleSendMessage();
    }
  };

  return (
    <div style={{
      position: 'fixed', 
      bottom: '20px',    
      right: '20px',    
      zIndex: 1000,      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end', 
    }}>
     
      {isOpen && (
        <Card
            title={
            <div style={{ 
              textAlign: 'center', 
              flexGrow: 1, 
              color: '#ffffff', 
              fontSize: '1.2em' 
            }}>
              Asistente Virtual
            </div>
            }
          extra={<Button type="text" icon={<CloseOutlined />} onClick={() => setIsOpen(false)} style={{ color: '#ffffff' }} />}
          styles={{
            header: {
               backgroundColor: '#0f3460', 
              color: '#ffffff',
              fontSize: '1.2em',
              padding: '10px 15px',
              borderBottom: 'none',
              borderRadius: '8px 8px 0 0',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              
            },
            body: {
              padding: '0', 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }
          }}
          style={{ 
            width: '350px', 
            height: '500px',
            borderRadius: '8px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            backgroundColor: '#f0f2f5', 
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '15px' 
          }}
        >
          <div style={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            padding: '15px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px' 
          }}>
            {messages.length === 0 && !isLoading && (
              <div style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
               <Avatar src={logo_morado} size={50} style={{ marginBottom: '5px' }} /> 
                <Text>¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?</Text>
              </div>
            )}

            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start'
                }}
              >
                {msg.role === 'model' && (
                  <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#00BFFF', marginRight: '8px' }} />
                )}
                <Card 
                  style={{ 
                    maxWidth: '80%', 
                    borderRadius: '15px', 
                    backgroundColor: msg.role === 'user' ? '#e6f7ff' : '#ffffff', 
                    borderColor: msg.role === 'user' ? '#91d5ff' : '#d9d9d9',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                  }}
                  bodyStyle={{ padding: '8px 12px' }}
                >
                  <Text>{msg.parts[0].text}</Text>
                </Card>
                {msg.role === 'user' && (
                  <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#5932c7', marginLeft: '8px' }} />
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                 <Avatar src={logo_morado} style={{ marginRight: '8px' }} />
                <Card style={{ maxWidth: '80%', borderRadius: '15px', backgroundColor: '#ffffff', borderColor: '#d9d9d9' }} bodyStyle={{ padding: '8px 12px' }}>
                  <Spin size="small" />
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} /> 
          </div>

          <div style={{ padding: '15px', borderTop: '1px solid #e0e0e0', backgroundColor: '#ffffff', borderRadius: '0 0 8px 8px' }}>
            <Space.Compact style={{ width: '100%' }}>
              <TextArea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onPressEnter={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                style={{ borderRadius: '5px', borderColor: '#d9d9d9' }}
                disabled={isLoading}
              />
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                onClick={handleSendMessage} 
                loading={isLoading}
                style={{ 
                  backgroundColor: '#0f3460', 
                  borderColor: '#0f3460',
                  borderRadius: '5px',
                  marginLeft: '10px'
                }}
              >
                Enviar
              </Button>
            </Space.Compact>
          </div>
        </Card>
      )}

      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={isOpen ? <CloseOutlined /> : <MessageOutlined />}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#0f3460', 
          borderColor: '#0f3460',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out',
          marginTop: isOpen ? '0px' : '0px' 
        }}
      />
    </div>
  );
}

export default FloatingChatbot;
