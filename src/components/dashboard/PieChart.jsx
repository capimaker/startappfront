import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = ({ worked, remaining }) => {
  const chartBackgroundColor = 'rgba(0,0,0,0)';
  const plotBackgroundColor = 'rgba(0,0,0,0)';
  const gaugeBarColor = '#7c4cdd';
  const remainingColor = 'rgba(255, 255, 255, 0.2)';
  const lighterTextColor = '#fff';
  const fontName = 'Montserrat, sans-serif';

  return (
    <Plot
      data={[
        {
          type: 'pie',
          values: [worked, remaining],
          labels: ['Realizadas', 'Restantes'],
          textinfo: 'percent',
          hoverinfo: 'label+percent+value',
          hole: 0.6,
          marker: {
            colors: [gaugeBarColor, remainingColor],
            line: {
              color: 'rgba(0,0,0,0)',
              width: 0,
            },
          },
          textfont: {
            color: lighterTextColor,
            family: fontName,
            size: 16,
          },
          title: {
            text: 'Mentorias',
            font: {
              size: 20,
              color: lighterTextColor,
              family: fontName,
            },
            y: 0.95,
          },
        },
      ]}
      layout={{
        margin: { l: 20, r: 20, t: 70, b: 20 },
        height: 300,
        showlegend: true,
        legend: {
          orientation: 'h',
          yanchor: 'bottom',
          y: -0.2,
          xanchor: 'center',
          x: 0.5,
          font: {
            color: lighterTextColor,
            family: fontName,
            size: 14,
          },
          bgcolor: 'rgba(0,0,0,0)',
        },
        paper_bgcolor: chartBackgroundColor,
        plot_bgcolor: plotBackgroundColor,
        font: {
          family: fontName,
          color: lighterTextColor,
        },
        autosize: true,
        domain: { x: [0.0, 1.0], y: [0.15, 0.85] },
        // *** AÑADIDO: Deshabilitar transiciones/animaciones en la carga ***
        transition: {
          duration: 0, // Duración de 0 milisegundos
          easing: 'linear', // Tipo de easing
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

export default PieChart;
