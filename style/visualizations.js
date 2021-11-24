var speed = 1000;

inp_aspeed.addEventListener("input", vis_speed);

function vis_speed() {
  var array_speed = inp_aspeed.value;
  switch (parseInt(array_speed)) {
    case 1:
      speed = 10;
      break;
    case 2:
      speed = 100;
      break;
    case 3:
      speed = 1000;
      break;
  }

  delay_time = 10000 / (Math.floor(array_size / 10) * speed); //Decrease numerator to increase speed.
}

var delay_time = 10000 / (Math.floor(array_size / 10) * speed); //Decrease numerator to increase speed.
var c_delay = 0; //This is updated ov every div change so that visualization is visible.

function div_update(cont, height, color) {
  window.setTimeout(function () {
    cont.style =
      " margin:0% " +
      margin_size +
      "%; width:" +
      (100 / array_size - 2 * margin_size) +
      "%; height:" +
      height * 2.5 +
      "%; background-color:" +
      color +
      ";";
  }, (c_delay += delay_time));
}

function enable_buttons(e) {
  console.log(e);
  window.setTimeout(function () {
    console.log(butts_algos);
    for (var i = 0; i < butts_algos.length; i++) {
      butts_algos[i].classList = [];
      butts_algos[i].classList.add("butt_unselected");

      butts_algos[i].disabled = false;
      inp_as.disabled = false;
      inp_gen.disabled = false;
      inp_aspeed.disabled = false;
    }
  }, (c_delay += delay_time));

  vis_data = {
    ...vis_data,
    [e]: {
      ...vis_data[e],
      [array_size]: {
        array: div_sizes.slice(0, array_size),
        time: "",
      },
    },
  };
  //   vis_data[array_size] = { ...vis_data[array_size], time: c_delay };
  vis_data[e][array_size]["time"] = Math.floor(c_delay);
  console.log(c_delay);
  console.log("array data", vis_data);
}
