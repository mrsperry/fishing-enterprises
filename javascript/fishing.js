var is_fishing = false;

var found_worms = false;
var caught_small_fish = false;
var caught_medium_fish = false;
var caught_large_fish = false;

var worm_count = 0;
var guppy_count = 0;
var small_fish_count = 0;
var medium_fish_count = 0;
var large_fish_count = 0;

// TODO: implement maxes
var worm_max = 30;
var guppy_max = 10;
var small_fish_max = 10;
var medium_fish_max = 5;
var large_fish_max = 3;

function fishing_update() {
	if (is_fishing) {
		// multipliers for catching fish, chances without bait are low
		var small_fish_multiplier = 1;
		var medium_fish_multiplier = 0;
		var large_fish_multiplier = 0;

		// set the small fish multiplier if they have bait
		if (worm_count > 0) {
			small_fish_multiplier = 6;
		} else {
			write_message("won't catch much without worms...");
		}

		// set the medium fish multiplier if they have caught a guppy
		if (worm_count > 0 && guppy_count > 0) {
			medium_fish_multiplier = 3;
		}

		// set the large fish multiplier if they have caught medium fish & have small fish
		if (caught_medium_fish) {
			if (worm_count > 0 && guppy_count > 0 && small_fish_count) {
				large_fish_multiplier = 5;
			}
		}

		// initialize the non-bait chances of catching fish
		var small_fish_chance = get_random(1, 10) * small_fish_multiplier;
		var medium_fish_chance = get_random(1, 5) * medium_fish_multiplier;
		var large_fish_chance = get_random(1, 1) * large_fish_multiplier;

		// start checking chances of catching fish
		if (get_random(1, 100) < large_fish_chance) {
			if (caught_medium_fish) {
				increment_large_fish();
				decrement_worms();
				decrement_guppies();
				decrement_small_fish();

				return;
			}
		} else if (get_random(1, 100) < medium_fish_chance) {
			if (caught_small_fish) {
				increment_medium_fish();
				decrement_worms();
				decrement_guppies();

				return;
			}
		} else if (get_random(1, 100) < small_fish_chance) {
			// 50% chance to get a guppy instead of small fish
			if (get_random(1, 2) == 1 && caught_small_fish) {
				increment_guppies();
			} else {
				increment_small_fish();
			}

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

	write_message("reeling in your line is always a tedious process");
}

function increment_worms() {
	// if this is the first time you find a worm, unlock fishing and show worm count
	if (!found_worms) {
		document.getElementById("worms").classList.remove("hidden");
		document.getElementById("fishing_buttons").classList.remove("hidden");

		found_worms = true;
	}

	// get a random amount of worms between 1-3
	document.getElementById("worm_count").innerText = (worm_count += get_random(1, 3));

	write_message("you grab some writhing worms from the mud");
}

function decrement_worms() {
	document.getElementById("worm_count").innerText = --worm_count;
}

function increment_guppies() {
	document.getElementById("guppy_count").innerText = ++guppy_count;

	write_message("these little things would make great bait for larger fish");
}

function decrement_guppies() {
	document.getElementById("guppy_count").innerText = --guppy_count;
}

function increment_small_fish() {
	// if this is the first time you catch a fish, show small fish count
	if (!caught_small_fish) {
		document.getElementById("small_fish").classList.remove("hidden");
		document.getElementById("guppies").classList.remove("hidden");

		caught_small_fish = true;
	}

	document.getElementById("small_fish_count").innerText = ++small_fish_count;

	write_message("you feel a slight tug; small fish aren't really special");
}

function decrement_small_fish() {
	document.getElementById("small_fish_count").innerText = --small_fish_count;
}

function increment_medium_fish() {
	if (!caught_medium_fish) {
		document.getElementById("medium_fish").classList.remove("hidden");

		caught_medium_fish = true;
	}

	document.getElementById("medium_fish_count").innerText = ++medium_fish_count;

	write_message("an average sized fish but still nothing to scoff at");
}

function increment_large_fish() {
	if (!caught_large_fish) {
		document.getElementById("large_fish").classList.remove("hidden");

		caught_large_fish = true;
	}

	document.getElementById("large_fish_count").innerText = ++large_fish_count;

	write_message("quite the impressive catch; it looks to have put up a fight");
}