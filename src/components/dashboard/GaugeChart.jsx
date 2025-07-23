import React from 'react';
import Plot from 'react-plotly.js';

const GaugeChart = ({ value, max }) => {
  // Colores y fuente de tus variables CSS
  // Como Plotly no lee variables CSS directamente, las definimos aquí con sus valores hexadecimales/rgba.
  // Idealmente, estos valores podrían venir de un archivo de configuración JS o pasarse como props.
  const chartBackgroundColor = 'rgba(0,0,0,0)'; // Fondo transparente para ver el Card de Ant Design
  const plotBackgroundColor = 'rgba(0,0,0,0)'; // Fondo transparente para el área del plot
  const gaugeBarColor = '#7c4cdd'; // Tu --purpura
  const textColor = 'rgba(255, 255, 255, 0.87)'; // Tu color de texto general
  const lighterTextColor = '#fff'; // Tu --blanco
  const fontName = 'Montserrat, sans-serif'; // Tu --font

  return (
    <Plot
      data={[
        {
          type: 'indicator',
          mode: 'gauge+number',
          value,
          gauge: {
            axis: {
              range: [0, max],
              tickfont: {
                color: textColor,
                family: fontName,
              },
              showticklabels: false, // Quitando los números pequeños del eje
            },
            bar: {
              color: gaugeBarColor, // Color de la barra de progreso (tu púrpura)
              line: {
                color: gaugeBarColor,
                width: 0,
              },
            },
            bgcolor: 'transparent', // Fondo del semicírculo del gauge, transparente
            borderwidth: 0, // Sin borde alrededor del gauge
            bordercolor: 'transparent',
          },
          title: {
            text: 'Progreso de horas',
            font: {
              size: 20,
              color: lighterTextColor, // Título en blanco
              family: fontName,
            },
          },
          number: {
            suffix: '',
            font: {
              size: 50, // Número central grande
              color: lighterTextColor, // Número central en blanco
              family: fontName,
            },
          },
        },
      ]}
      layout={{
        margin: { l: 20, r: 20, t: 40, b: 0 },
        height: 300,
        paper_bgcolor: chartBackgroundColor,
        plot_bgcolor: plotBackgroundColor,
        font: {
          family: fontName,
          color: textColor,
        },
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default GaugeChart;
