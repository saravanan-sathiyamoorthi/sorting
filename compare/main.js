//Variables (BE CAREFUL THESE MIGHT BE USED IN OTHER JS FILES TOO)
var inp_as = document.getElementById("a_size"),
  array_size = inp_as.value;
var inp_gen = document.getElementById("a_generate");
var inp_aspeed = document.getElementById("a_speed");
var compare_btn = document.querySelector("#compare-btn");
var butts_algos = document.querySelectorAll(".algos button");
let visualization_container = document.querySelector("#visualization");
let graph_main_container = document.querySelector("#graph-section");

var div_sizes = [];
var divs = [];
var margin_size;
var cont = document.getElementById("array_container");
cont.style = "flex-direction:row";
let vis_data = {};

//Array generation and updation.

inp_gen.addEventListener("click", generate_array);
inp_as.addEventListener("change", update_array_size);

function generate_array() {
  cont.innerHTML = "";
  visualization_container.style.display = "block";
  graph_main_container.style.display = "none";
  for (var i = 0; i < array_size; i++) {
    div_sizes[i] = (Math.random() * 0.5 * (inp_as.max - inp_as.min));
    divs[i] = document.createElement("div");
    cont.appendChild(divs[i]);
    margin_size = 0.1;
    divs[i].style =
      " margin:0% " +
      margin_size +
      "%; background-color:rgb(255,12,147); width:" +
      (100 / array_size - 2 * margin_size) +
      "%; height:" +
      div_sizes[i] * 4 +
      "%;";
    }
    console.log("Array is : ",div_sizes);
}

function update_array_size() {
  array_size = inp_as.value;
  generate_array();
}

window.onload = update_array_size();

//Running the appropriate algorithm.
for (var i = 0; i < butts_algos.length; i++) {
  butts_algos[i].addEventListener("click", runalgo);
}

function disable_buttons() {
  for (var i = 0; i < butts_algos.length; i++) {
    butts_algos[i].classList = [];
    butts_algos[i].classList.add("butt_locked");

    butts_algos[i].disabled = true;
    inp_as.disabled = true;
    inp_gen.disabled = true;
    inp_aspeed.disabled = true;
  }
}

function runalgo() {
  disable_buttons();
  let selected = this.innerHTML;
  this.classList.add("butt_selected");
  switch (selected) {
    case "Bubble":
      Bubble(selected);
      break;
    case "Selection":
      Selection_sort(selected);
      break;
    case "Insertion":
      Insertion(selected);
      break;
    case "Merge":
      Merge(selected);
      break;
    case "Quick":
      Quick(selected);
      break;
  }
}
