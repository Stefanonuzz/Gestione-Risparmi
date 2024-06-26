import { Chart } from "chart.js/auto";

const canvas = document.getElementById("pieChart");

const budgetData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ["#FF6384", "#63FF84", "#84FF63", "#8463FF", "#6384FF"],
    },
  ],
};

const pieChart = new Chart(canvas, {
  type: "pie",
  data: budgetData,
});

export const updateChart = function (category, amount, type) {
  if (type !== "Entrata") {
    // Considera solo le spese
    const index = pieChart.data.labels.indexOf(category);
    if (index !== -1) {
      pieChart.data.datasets[0].data[index] += parseFloat(amount);
    } else {
      pieChart.data.labels.push(category);
      pieChart.data.datasets[0].data.push(parseFloat(amount));
    }
    pieChart.update();
  }
};

const columnCanvas = document.getElementById("column-chart");

const columnChart = new Chart(columnCanvas, {
  data: {
    datasets: [
      {
        type: "bar",
        label: "Bar Dataset",
        data: [],
      },
    ],
    labels: [],
  },
});

export const updateColumnChart = function (category, amount, type) {
  if (type !== "Entrata") {
    // Considera solo le spese
    const index = columnChart.data.labels.indexOf(category);
    if (index !== -1) {
      columnChart.data.datasets[0].data[index] += parseFloat(amount);
    } else {
      columnChart.data.labels.push(category);
      columnChart.data.datasets[0].data.push(parseFloat(amount));
    }
    columnChart.update();
  }
};

let labels = ["Alimentari", "Trasporti", "Svago", "Salute", "Altro"];
let dataset1Data = [10, 25, 13, 18, 30];
let dataset2Data = [20, 15, 28, 22, 10];

let ctx = document.getElementById("line-chart").getContext("2d");
let lineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Solid Line",
        data: dataset1Data,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Categorie",
          font: {
            padding: 4,
            size: 20,
            weight: "bold",
            family: "Arial",
          },
          color: "darkblue",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valori",
          font: {
            size: 20,
            weight: "bold",
            family: "Arial",
          },
          color: "darkblue",
        },
        beginAtZero: true,
        scaleLabel: {
          display: true,
          labelString: "Values",
        },
      },
    },
  },
});
