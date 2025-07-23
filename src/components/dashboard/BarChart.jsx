import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ data }) => {
  const tasks = data.map(t => t.task);
  const hours = data.map(t => t.hours);

  return (
    <Plot
      data={[{
        type: 'bar',
        x: tasks,
        y: hours,
      }]}
      layout={{ margin: { l:40, r:20, t:40, b:80 }, height: 350, xaxis: { automargin: true } }}
      config={{ displayModeBar: false }}
      style={{ width: '100%' }}
    />
  );
};

export default BarChart;
