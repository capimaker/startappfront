
import ContactCard from '../components/common/ContactCard/ContactCard'; 

function ContactPage() {
  const pageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh', 
    padding: '20px',
    backgroundColor: '#f0f2f5', 
  };

  return (
    <div style={pageContainerStyle}>
      <ContactCard /> 
    </div>
  );
}

export default ContactPage;
