import React from 'react';
import Plot from 'react-plotly.js';

const GaugeChart = ({ value, max }) => {
  const chartBackgroundColor = 'rgba(0,0,0,0)'; // Transparente
  const plotBackgroundColor = 'rgba(0,0,0,0)'; // Transparente
  const gaugeBarColor = '#7c4cdd'; // Tu color púrpura
  const lighterTextColor = '#fff'; // Para títulos y números grandes, más blanco
  const fontName = 'Montserrat, sans-serif';

  // --- Generación dinámica de ticks ---
  // Para que coincida con tu imagen (0, 20, 40, 60) cuando max es 60,
  // vamos a generar 4 ticks equidistantes, incluyendo 0 y max.
  const numberOfTicks = 4; // Incluye 0 y el valor máximo.
  const dynamicTickValues = [];
  const dynamicTickLabels = [];
  for (let i = 0; i < numberOfTicks; i++) {
    const tickVal = (max / (numberOfTicks - 1)) * i;
    dynamicTickValues.push(tickVal);
    dynamicTickLabels.push(`${Math.round(tickVal)}`);
  }
  // Ejemplo para max=60: [0, 20, 40, 60]

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
                size: 14, // Tamaño de fuente ligeramente más pequeño para los ticks
              },
              showticklabels: true, // Mostrar etiquetas de los ticks
              tickmode: 'array', // Usar un array para controlar explícitamente los ticks
              tickvals: dynamicTickValues, // Los valores donde aparecen las marcas
              ticktext: dynamicTickLabels, // Las etiquetas de texto para las marcas
              ticklen: 8, // Longitud de la marca de tick
              tickwidth: 2, // Ancho de la línea de tick
              tickcolor: lighterTextColor, // Color de las rayitas
              ticks: 'outside', // Muestra los ticks fuera del eje
              tickangle: 0, // Asegura que los números no estén rotados
              ticklabelstep: 1, // Asegura que todas las etiquetas de tickvals/ticktext se muestren
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
            steps: [
              { range: [0, max], color: 'rgba(255, 255, 255, 0.2)' }, // Fondo del arco del gauge
            ],
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
            y: 1.05, // Ajusta la posición del título hacia arriba para dar más espacio
          },
          number: {
            suffix: '',
            font: {
              size: 50, // Tamaño grande para el valor principal
              color: lighterTextColor,
              family: fontName,
            },
          },
        },
      ]}
      layout={{
        // CLAVE: Ajustar los márgenes para dar espacio a los ticks y al título
        margin: { l: 30, r: 30, t: 70, b: 20 }, // Margen para dar espacio a los ticks y título
        height: 300, // Reducimos la altura del gráfico total. Antes 350px.
        paper_bgcolor: chartBackgroundColor,
        plot_bgcolor: plotBackgroundColor,
        font: {
          family: fontName,
          color: lighterTextColor,
        },
        gauge: {
          // Ajustar el dominio para que el gauge en sí ocupe un poco menos de espacio
          // y se sienta más 'contenido' dentro de su contenedor.
          domain: { x: [0.1, 0.9], y: [0.15, 0.85] }, // Ajustado para un aspecto más compacto y centrado
        },
        autosize: true, // Auto-ajuste al tamaño del contenedor
      }}
      config={{
        displayModeBar: false,
        responsive: true, // Fundamental para la responsividad
      }}
      style={{ width: '100%', height: '100%' }} // Hace que el gráfico ocupe el 100% del contenedor padre
    />
  );
};

export default GaugeChart;
