const chartData = {
  labels: measurements.map((measurement) =>
    new Date(measurement.startTime).toLocaleString()
  ),
  datasets: [
    {
      label: "Download",
      data: measurements.map((measurement) => measurement.download),
    },
    {
      label: "Upload",
      data: measurements.map((measurement) => measurement.upload),
    },
  ],
};
const ctx = document.getElementById("chart");
new Chart(ctx, {
  type: "line",
  data: chartData,
  options: {
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            console.log(value, index, ticks);
            return speedText(value);
          },
        },
      },
    },
  },
});
