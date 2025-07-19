
import InfoCard from '../components/common/InfoCard/InfoCard'; 
function InfoPage() {
  const pageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', 
    minHeight: '80vh', 
    padding: '20px',
    backgroundColor: '#f0f2f5',
  };

  return (
    <div style={pageContainerStyle}>
      <InfoCard /> 
    </div>
  );
}
export default InfoPage;