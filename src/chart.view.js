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
    savePieChartData();
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
    savePieChartData();
  }
};

const savePieChartData = () => {
  const pieChartData = {
    labels: pieChart.data.labels,
    data: pieChart.data.datasets[0].data,
  };
  localStorage.setItem("pieChartData", JSON.stringify(pieChartData));
};

export const loadPieChartData = () => {
  const savedPieChartData = localStorage.getItem("pieChartData");
  if (savedPieChartData) {
    const parsedData = JSON.parse(savedPieChartData);
    pieChart.data.labels = parsedData.labels;
    pieChart.data.datasets[0].data = parsedData.data;
    pieChart.update();
  }
};

const columnCanvas = document.getElementById("column-chart");

const columnChart = new Chart(columnCanvas, {
  data: {
    datasets: [
      {
        type: "bar",
        label: [],
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
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
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
    saveColumnChartData();
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
    saveColumnChartData();
  }
};

const saveColumnChartData = () => {
  const columnChartData = {
    labels: columnChart.data.labels,
    data: columnChart.data.datasets[0].data,
  };
  localStorage.setItem("columnChartData", JSON.stringify(columnChartData));
};

export const loadColumnChartData = () => {
  const savedColumnChartData = localStorage.getItem("columnChartData");
  if (savedColumnChartData) {
    const parsedData = JSON.parse(savedColumnChartData);
    columnChart.data.labels = parsedData.labels;
    columnChart.data.datasets[0].data = parsedData.data;
    columnChart.update();
  }
};

let ctx = document.getElementById("line-chart").getContext("2d");
const lineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Spese nel tempo",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        // tension: 0.1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
  },
});

export const updateLineChart = function (amount, type) {
  const currentData = lineChart.data.datasets[0].data;

  if (type === "Entrata") {
    const previousData = currentData[currentData.length - 1] || 0;
    const newData = previousData + parseFloat(amount);
    lineChart.data.datasets[0].data.push(newData);
  } else {
    const previousData = currentData[currentData.length - 1] || 0;
    const newData = previousData - parseFloat(amount);
    lineChart.data.datasets[0].data.push(newData);
  }

  const currentLabels = lineChart.data.labels;
  const nextLabel = "";
  lineChart.data.labels.push(nextLabel);

  lineChart.update();
};

export const deleteFromLineChart = function (index) {
  const currentData = lineChart.data.datasets[0].data;
  const currentLabels = lineChart.data.labels;

  currentData.splice(index, 1);

  currentLabels.splice(index, 1);

  lineChart.update();
};
