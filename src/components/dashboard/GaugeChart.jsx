import React from 'react';
import Plot from 'react-plotly.js';

const GaugeChart = ({ value, max }) => (
  <Plot
    data={[
      {
        type: 'indicator',
        mode: 'gauge+number',
        value,
        gauge: {
          axis: { range: [0, max], showticklabels: true, tickfont: { color: 'var(--text-light)' } }, // Eje con texto claro
          bar: { color: 'var(--accent-purple)' }, // Color de la barra
          bgcolor: 'var(--secondary-bg-light)', // Fondo del gauge
          borderwidth: 1,
          bordercolor: 'var(--border-color)',
        },
        title: { text: 'Progreso de horas', font: { color: 'var(--text-lighter)' } }, // Título claro
      },
    ]}
    layout={{
      margin: { l: 20, r: 20, t: 40, b: 0 },
      height: 300,
      paper_bgcolor: 'transparent', // Fondo del papel transparente para ver la Card de abajo
      plot_bgcolor: 'transparent', // Fondo del plot transparente
      font: { color: 'var(--text-light)', family: 'var(--font)' }, // Fuente y color general del texto del gráfico
    }}
    config={{ displayModeBar: false }}
    style={{ width: '100%' }}
  />
);

export default GaugeChart;
