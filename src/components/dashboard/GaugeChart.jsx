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
    // Agrega un div contenedor con un tamaño definido o relativo para que el gráfico sea responsivo dentro de él.
    // Por ejemplo, aquí lo pongo con un alto de 200px. Puedes ajustarlo o usar flexbox/grid para controlarlo.
    <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                  size: 10, // Tamaño de fuente reducido para las etiquetas del eje
                },
                showticklabels: true,
                tickmode: 'array',
                tickvals: dynamicTickValues,
                ticktext: dynamicTickLabels,
                ticklen: 6, // Longitud del tick reducida
                tickwidth: 1, // Ancho del tick reducido
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
                size: 16, // Tamaño de fuente reducido para el título
                color: lighterTextColor,
                family: fontName,
              },
              y: 1.05,
            },
            number: {
              suffix: '',
              font: {
                size: 36, // Tamaño de fuente reducido para el número principal
                color: lighterTextColor,
                family: fontName,
              },
            },
          },
        ]}
        layout={{
          // Márgenes reducidos para dar más espacio al gráfico
          margin: { l: 10, r: 10, t: 50, b: 10 },
          // Quitamos 'height' aquí, ya que el contenedor padre lo controlará.
          // height: 300,
          paper_bgcolor: chartBackgroundColor,
          plot_bgcolor: plotBackgroundColor,
          font: {
            family: fontName,
            color: lighterTextColor,
          },
          gauge: {
            // Ajustar el dominio puede hacer que el medidor sea más compacto dentro del área
            domain: { x: [0.05, 0.95], y: [0.1, 0.9] },
          },
          autosize: true, // Esto es clave para la responsividad
          transition: {
            duration: 0,
            easing: 'linear',
          },
        }}
        config={{
          displayModeBar: false,
          responsive: true, // Esto es clave para la responsividad
        }}
        // Se asegura de que el gráfico ocupe todo el espacio de su contenedor
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default GaugeChart;
