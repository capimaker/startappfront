import React from 'react';
import Plot from 'react-plotly.js';

const GaugeChart = ({ value, max }) => {
  const chartBackgroundColor = 'rgba(0,0,0,0)'; // Transparente
  const plotBackgroundColor = 'rgba(0,0,0,0)'; // Transparente
  const gaugeBarColor = '#7c4cdd'; // Tu color púrpura
  const lighterTextColor = '#fff'; // Para títulos y números grandes, más blanco
  const fontName = 'Montserrat, sans-serif';

  const numberOfTicks = 4;
  const dynamicTickValues = [];
  const dynamicTickLabels = [];
  for (let i = 0; i < numberOfTicks; i++) {
    const tickVal = (max / (numberOfTicks - 1)) * i;
    dynamicTickValues.push(tickVal);
    dynamicTickLabels.push(`${Math.round(tickVal)}`);
  }

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
                color: lighterTextColor,
                family: fontName,
                size: 14,
              },
              showticklabels: true,
              tickmode: 'array',
              tickvals: dynamicTickValues,
              ticktext: dynamicTickLabels,
              ticklen: 8,
              tickwidth: 2,
              tickcolor: lighterTextColor,
              ticks: 'outside',
              tickangle: 0,
              ticklabelstep: 1,
            },
            bar: {
              color: gaugeBarColor,
              line: {
                color: gaugeBarColor,
                width: 0,
              },
            },
            bgcolor: 'transparent',
            borderwidth: 0,
            bordercolor: 'transparent',
            steps: [{ range: [0, max], color: 'rgba(255, 255, 255, 0.2)' }],
            threshold: {
              line: { color: gaugeBarColor, width: 0 },
              thickness: 0.75,
              value: value,
            },
          },
          title: {
            text: 'Progreso de horas',
            font: {
              size: 20,
              color: lighterTextColor,
              family: fontName,
            },
            y: 1.05,
          },
          number: {
            suffix: '',
            font: {
              size: 50,
              color: lighterTextColor,
              family: fontName,
            },
          },
        },
      ]}
      layout={{
        margin: { l: 30, r: 30, t: 70, b: 20 },
        height: 300,
        paper_bgcolor: chartBackgroundColor,
        plot_bgcolor: plotBackgroundColor,
        font: {
          family: fontName,
          color: lighterTextColor,
        },
        gauge: {
          domain: { x: [0.1, 0.9], y: [0.15, 0.85] },
        },
        autosize: true,
        // *** AÑADIDO: Deshabilitar transiciones/animaciones en la carga ***
        transition: {
          duration: 0, // Duración de 0 milisegundos
          easing: 'linear', // Tipo de easing (aunque no importa con duración 0)
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
