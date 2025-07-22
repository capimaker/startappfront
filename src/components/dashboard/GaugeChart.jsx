import React from 'react';
import Plot from 'react-plotly.js';

const GaugeChart = ({ value, max }) => (
  <Plot
    data={[{
      type: 'indicator',
      mode: 'gauge+number',
      value,
      gauge: {
        axis: { range: [0, max] },
        bar: { color: '#1890ff' },
      },
      title: { text: 'Progreso de horas' },
    }]}
    layout={{ margin: { l:20, r:20, t:40, b:0 }, height: 300 }}
    config={{ displayModeBar: false }}
    style={{ width: '100%' }}
  />
);

export default GaugeChart;
