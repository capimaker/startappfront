import Plot from 'react-plotly.js';

const PieChart = ({ worked, remaining }) => {
  const chartBackgroundColor = 'rgba(0,0,0,0)'; // Transparente
  const plotBackgroundColor = 'rgba(0,0,0,0)'; // Transparente
  const gaugeBarColor = '#7c4cdd'; // Tu color púrpura (usado para "Realizadas")
  const remainingColor = 'rgba(255, 255, 255, 0.2)'; // El color de fondo del arco del gauge (usado para "Restantes")
  const lighterTextColor = '#fff'; // Para texto en general, más blanco
  const fontName = 'Montserrat, sans-serif';

  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: [worked, remaining],
          labels: ['Realizadas', 'Restantes'],
          textinfo: 'percent', // Muestra solo el porcentaje en el interior
          hoverinfo: 'label+percent+value', // Muestra más información al pasar el ratón
          hole: 0.6, // Mantener el agujero de donut
          marker: {
            colors: [gaugeBarColor, remainingColor], // Colores de las porciones
            line: {
              color: 'rgba(0,0,0,0)', // Borde de las porciones transparente
              width: 0,
            },
          },
          textfont: {
            color: lighterTextColor, // Color del texto dentro de las porciones
            family: fontName,
            size: 16, // ¡REDUCIDO! Antes 20, ahora 16 para más "padding" visual
          },
          title: {
            text: 'Distribución de Horas', // Título para el Pie Chart
            font: {
              size: 20,
              color: lighterTextColor,
              family: fontName,
            },
            y: 0.95, // Ajusta la posición del título
          },
        },
      ]}
      layout={{
        margin: { l: 20, r: 20, t: 70, b: 20 }, // Margen similar al GaugeChart para consistencia
        height: 300, // Misma altura que el GaugeChart para que las Cards coincidan
        showlegend: true, // Mostrar la leyenda
        legend: {
          orientation: 'h', // Leyenda horizontal
          yanchor: 'bottom', // Ancla en la parte inferior
          y: -0.2, // ¡AJUSTADO! Antes -0.1, ahora -0.2 para un margen más grande con el pie
          xanchor: 'center', // Ancla en el centro horizontal
          x: 0.5, // Posición horizontal de la leyenda
          font: {
            color: lighterTextColor, // Color del texto de la leyenda
            family: fontName,
            size: 14, // Tamaño de la fuente de la leyenda
          },
          bgcolor: 'rgba(0,0,0,0)', // Fondo transparente para la leyenda
        },
        paper_bgcolor: chartBackgroundColor, // Fondo del "papel" del gráfico transparente
        plot_bgcolor: plotBackgroundColor, // Fondo del área de trazado transparente
        font: {
          family: fontName,
          color: lighterTextColor, // Color de fuente general
        },
        autosize: true, // Auto-ajuste al tamaño del contenedor
        // Posicionamiento del gráfico dentro del layout.
        // Esto puede ayudar a dar más "padding" al alrededor del donut si se siente apretado
        // sin cambiar el tamaño general del gráfico.
        domain: { x: [0.0, 1.0], y: [0.15, 0.85] }, // Ajustado para centrar mejor el donut verticalmente
      }}
      config={{
        displayModeBar: false,
        responsive: true, // Fundamental para la responsividad
      }}
      style={{ width: '100%', height: '100%' }} // Hace que el gráfico ocupe el 100% del contenedor padre
    />
  );
};

export default PieChart;
