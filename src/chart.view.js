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

export const pieChart = new Chart(canvas, {
  type: "pie",
  data: budgetData,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            console.log(tooltipItem);
            const dataset = tooltipItem.chart.data.datasets[0];
            const total = dataset.data.reduce(
              (acc, currValue) => acc + currValue,
              0
            );

            const currentValue = dataset.data[tooltipItem.dataIndex];

            const percentage = ((currentValue / total) * 100).toFixed(1);

            const label = tooltipItem.label;

            return `${label}: ${percentage}%`;
          },
        },
      },
    },
  },
});

export const updateChart = function (category, amount, type) {
  if (type !== "Entrata") {
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

export const deleteFromPieChart = function (category, amount) {
  const index = pieChart.data.labels.indexOf(category);
  if (index !== -1) {
    pieChart.data.datasets[0].data[index] -= parseFloat(amount);
    if (pieChart.data.datasets[0].data[index] <= 0) {
      pieChart.data.labels.splice(index, 1);
      pieChart.data.datasets[0].data.splice(index, 1);
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
        label: "Uscite",
        data: [],
        backgroundColor: [
          "#FF6384",
          "#63FF84",
          "#84FF63",
          "#8463FF",
          "#6384FF",
        ],
      },
    ],
    labels: [],
  },
});

export const updateColumnChart = function (category, amount, type) {
  if (type !== "Entrata") {
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

export const deleteFromColumnChart = function (category, amount) {
  const index = columnChart.data.labels.indexOf(category);
  if (index !== -1) {
    columnChart.data.datasets[0].data[index] -= parseFloat(amount);
    if (columnChart.data.datasets[0].data[index] <= 0) {
      columnChart.data.labels.splice(index, 1);
      columnChart.data.datasets[0].data.splice(index, 1);
    }
    columnChart.update();
  }
};

let labels = [];

let ctx = document.getElementById("line-chart").getContext("2d");
const lineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Solid Line",
        data: [],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  },

  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.chart.data.datasets[0];
            const totalUscite = dataset.data.reduce(
              (acc, currValue) => acc + currValue,
              0
            );

            return `Uscite totali: €${totalUscite.toFixed(2)}`;
          },
        },
      },
    },
  },

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
});

export const updateLineChart = function (amount, type) {
  if (type !== "Entrata") {
    const categoryLabel = "Uscite";
    const index = lineChart.data.labels.indexOf(categoryLabel);

    if (index !== -1) {
      lineChart.data.datasets[0].data[index] += parseFloat(amount);
    } else {
      lineChart.data.labels.push(categoryLabel);
      lineChart.data.datasets[0].data.push(parseFloat(amount));
    }

    lineChart.update();
  }
};

export const deleteFromLineChart = function (category, amount) {
  const index = lineChart.data.labels.indexOf(category);
  if (index !== -1) {
    lineChart.data.datasets[0].data[index] -= parseFloat(amount);
    if (lineChart.data.datasets[0].data[index] <= 0) {
      lineChart.data.labels.splice(index, 1);
      lineChart.data.datasets[0].data.splice(index, 1);
    }
    lineChart.update();
  }
};
