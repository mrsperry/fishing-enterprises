var light_switch = true;

function toggle_lights() {
	var text = document.getElementById("lights");
	var body = document.getElementsByTagName("body")[0];

	var state = "lights off";
	var bg_color = "white";
	var font_color = "black";

	if (light_switch) {
		state = "lights on";
		bg_color = "#1a1a1a";
		font_color = "white";
	}

	text.innerHTML = state;
	body.style.background = bg_color;
	body.style.color = font_color;
	
	light_switch = !light_switch;
}