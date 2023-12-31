import './App.css';
import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { percentageData, power1Data, power2Data } from './data';
import moment from 'moment';

function App() {
  const setPointDataset = {
    label: "power 1",
    data: power2Data,
    color: "#008000",
    yAxisID: "kW",
    borderDash: [5, 5],
    fill: true,
  };

  const sessionDetailChartDataset = {
    label: "power 2",
    data: power1Data,
    color: "red",
    yAxisID: "kW",
  };

  const batterySocDataset = {
    label: "percentage",
    data: percentageData,
    color: "blue",
    yAxisID: "perc",
  };

  const timeChartOpts = {
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: "silver",
        },
        type: 'time',
        ticks: {
          font: {
            weight: 'bold',
          },
          callback: (value) => moment(value).format("DD/MM/YYYY hh:mm a")
        },
      },
      "kW": {
        grid: {
          color: "silver",
        },
        display: "auto",
        position: "left",
        title: {
          display: true,
          text: "kW",
          font: {
            size: '18px',
          },
        },
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
      "perc": {
        grid: {
          color: "silver",
        },
        display: "auto",
        position: "right",
        title: {
          display: true,
          text: "%",
          font: {
            size: '18px',
          },
        },
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
  }
  };


  return (
    <div className="App">
      <div style={{ width: "90%", height: "60%" }}>
      <Line
        options={timeChartOpts}
        data={{
          datasets: [setPointDataset, sessionDetailChartDataset, batterySocDataset].map((dataset) => ({
            label: dataset.label ?? '',
            data: dataset.data ?? [],
            backgroundColor: dataset.fill ? `${dataset.color}20` : dataset.color,
            borderColor: dataset.color,
            yAxisID: dataset.yAxisID ?? 'y',
            hoverRadius: 5,
            hitRadius: 10,
            stepped: dataset.stepped,
            borderDash: dataset.borderDash,
            fill: dataset.fill
          })),
        }}
      />
      </div>
    </div>
  );
}

export default App;
