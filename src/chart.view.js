import { Chart } from "chart.js/auto";

const canvas = document.getElementById("pieChart");

// Chart.defaults.global.defaultFontFamily = "Lato";
// Chart.defaults.global.defaultFontSize = 18;

const budgetData = {
  labels: ["Alimentari", "Trasporti", "Svago", "Salute", "Altro"],
  datasets: [
    {
      data: [133.3, 86.2, 52.2, 51.2, 50.2],
      backgroundColor: ["#FF6384", "#63FF84", "#84FF63", "#8463FF", "#6384FF"],
    },
  ],
};

const pieChart = new Chart(canvas, {
  type: "pie",
  data: budgetData,
});

const columnCanvas = document.getElementById("column-chart");

const mixedChart = new Chart(columnCanvas, {
  data: {
    datasets: [
      {
        type: "bar",
        label: "Bar Dataset",
        data: [133.3, 86.2, 52.2, 51.2, 50.2],
      },
      {
        type: "line",
        label: "Line Dataset",
        data: [50, 50, 50, 50],
      },
    ],
    labels: ["Alimentari", "Trasporti", "Svago", "Salute", "Altro"],
  },
});

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
