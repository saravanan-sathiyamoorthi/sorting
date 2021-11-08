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

function createGraphContainers() {
  graph_container.innerHTML = "";
  fields.forEach((data, index) => {
    graph_container.innerHTML += `<div>
        <canvas class="myChart" id="chart-${index}"></canvas>
        <span>${data}</span>
    </div>`;
  });
}
function comparison_graph() {
  createGraphContainers();
  //   let elements = document.querySelectorAll(".myChart");
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
compare_btn.addEventListener("click", () => compare_algos());
