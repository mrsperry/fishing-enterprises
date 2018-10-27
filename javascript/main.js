function initialize() {
	write_message("lovely day for some fishing...");
	window.setInterval(function() {
			update(); 
		}, 1500);
}

function update() {
	fishing_update();
}

function get_random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}