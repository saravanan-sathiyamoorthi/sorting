let graph_container = document.querySelector(".graph-container");
let graphMainContainer = document.querySelector("#graph-main");
let multiGraphMainContainer = document.querySelector("#multi-graph-main");
let test = document.querySelector("#test");

let fields;
function compare_algos() {
  Bubble("Bubble");
  Selection_sort("Selection");
  Insertion("Insertion");
  Merge("Merge");
  Quick("Quick");
  console.log("Comparison data", vis_data);
  fields = Object.keys(vis_data);
 comparison_graph();
}
// elements[0].onload = console.log(vis_data);
function getGroupedData() {
  let datagroup = [];
  fields.forEach((field) => {
    let time = [];
    Object.keys(vis_data[field]).forEach((size) => {
      time = [...time, vis_data[field][size]["time"]];
    });
    datagroup = [...datagroup, time];
  });
  // console.log("Grouped Array", datagroup);
  return datagroup;
}

function createGraphContainers() {
  graph_container.innerHTML = "";
  fields.forEach((data, index) => {
    graph_container.innerHTML += `<div>
        <canvas class="myChart" id="chart-${index}"></canvas>
        <span>${data}</span>
    </div>`;
  });
}

function createComparisonGraphContainer() {
  // if (document.querySelector("#multi-plot") === undefined)
  multiGraphMainContainer.innerHTML = "";
  multiGraphMainContainer.innerHTML = `<div class="comapare-graphs-container">
    <canvas class="myChart" id="multi-plot"></canvas>
  </div>`;
}
function comparison_graph() {
  createGraphContainers();
  createComparisonGraphContainer();
  //   let elements = document.querySelectorAll(".myChart");

  let groupedData = getGroupedData();
  fields.forEach((e, index) => {
    let data = [],
      labels = [],
      type = "line",
      target = document.querySelector(`#chart-${index}`);
    Object.keys(vis_data[e]).forEach((size) => {
      labels = [...labels, size];
      data = [...data, vis_data[e][size]["time"]];
    }),
      console.log(labels, data);

    graph(target, type, labels, data);
  });
  let multiplotContainer = document.querySelector("#multi-plot");
  multiGraph(multiplotContainer, "line", fields, groupedData);
  console.log("data", groupedData);
  // groupedData();
}

function graph(target, type, labels, data) {
  const chart = new Chart(target, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: "Sample plot",
          data: data,
          backgroundColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
            Math.random() * 255
          })`,

          borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
            Math.random() * 255
          })`,
        },
      ],
    },
  });
}

function multiGraph(target, type, labels, data) {
  let datasets = [], xLabel = [];
  labels.forEach((field, index) => {
    datasets = [
      ...datasets,
      {
        label: field,
        data: data[index],
        backgroundColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
        borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
      },
    ];
  });
  xLabel = Object.keys(vis_data[Object.keys(vis_data)[0]]);
  // console.log("X labels", xLabel);
  const chart = new Chart(target, {
    // labels: xLabel,
    type: type,
    data: {
      labels: xLabel,
      datasets: datasets,
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: "Time Complexity Comparision",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  });
}

compare_btn.addEventListener("click", () => {
  visualization_container.style.display = "none";
  graph_main_container.style.display = "block";
  compare_algos();
  // generate_array(50);
});

