import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = ({ worked, remaining }) => (
  <Plot
    data={[{
      type: 'pie',
      values: [worked, remaining],
      labels: ['Realizadas', 'Restantes'],
      textinfo: 'label+percent',
      hole: 0.4,
    }]}
    layout={{ margin: { l:20, r:20, t:40, b:0 }, height: 300, showlegend: true }}
    config={{ displayModeBar: false }}
    style={{ width: '100%' }}
  />
);

export default PieChart;
