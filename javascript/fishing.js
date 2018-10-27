var is_fishing = false;

var worm_count = 0;
var small_fish_count = 0;

function fishing_update() {
	if (is_fishing) {
		var fish_multiplier = 0;
		if (worm_count > 0) {
			fish_multiplier = 15;
		} else {
			write_message("won't catch much without bait...");
		}

		var fish_chance = Math.floor(Math.random() * 20 + fish_multiplier) + 5 + fish_multiplier;
		if ((Math.floor(Math.random() * 95) + 6) < fish_chance) {
			increment_small_fish();

			if (worm_count > 0) {
				decrement_worms();
			}
		}
	}
}

function cast_out_line() {
	document.getElementById("reel_in_line_button").disabled = false;
	document.getElementById("cast_out_line_button").disabled = true;
	document.getElementById("forage_for_worms_button").disabled = true;

	is_fishing = true;

	write_message("you cast out your line as far as your arm permits");
}

function reel_in_line() {
	document.getElementById("reel_in_line_button").disabled = true;
	document.getElementById("cast_out_line_button").disabled = false;
	document.getElementById("forage_for_worms_button").disabled = false;

	is_fishing = false;

	write_message("reeling your line in is always a tedious process");
}

function increment_worms() {
	// if this is the first time you find a worm, unlock fishing and show worm count
	if (worm_count == 0) {
		document.getElementById("worms").classList.remove("hidden");
		document.getElementById("fishing_buttons").classList.remove("hidden");
	}

	// get a random amount of worms between 1-3
	var amount = Math.floor(Math.random() * 2) + 1;
	document.getElementById("worm_count").innerText = (worm_count += amount);

	write_message("you forage for worms and find " + amount);
}

function decrement_worms() {
	document.getElementById("worm_count").innerText = --worm_count;
}

function increment_small_fish() {
	// if this is the first time you catch a fish, show small fish count
	if (small_fish_count == 0) {
		document.getElementById("small_fish").classList.remove("hidden");
	}

	document.getElementById("small_fish_count").innerText = ++small_fish_count;

	write_message("you feel a slight tug; small fish are nothing special");
}

function decrement_small_fish() {
	document.getElementById("small_fish_count").innerText = --small_fish_count;
}