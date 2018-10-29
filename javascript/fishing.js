let is_fishing = false;

let found_worms = false;
let caught_small_fish = false;
let caught_medium_fish = false;
let caught_large_fish = false;

let worm_count = 0;
let guppy_count = 0;
let small_fish_count = 0;
let medium_fish_count = 0;
let large_fish_count = 0;

// TODO: implement maxes
let worm_max = 30;
let guppy_max = 10;
let small_fish_max = 10;
let medium_fish_max = 5;
let large_fish_max = 3;

function fishing_update() {
    if (is_fishing) {
        // multipliers for catching fish, chances without bait are low
        let small_fish_multiplier = 1;
        let medium_fish_multiplier = 0;
        let large_fish_multiplier = 0;

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
        let small_fish_chance = get_random(1, 10) * small_fish_multiplier;
        let medium_fish_chance = get_random(1, 5) * medium_fish_multiplier;
        let large_fish_chance = get_random(1, 1) * large_fish_multiplier;

        // start checking chances of catching fish
        if (get_random(1, 100) < large_fish_chance) {
            if (caught_medium_fish) {
                if (large_fish_count < large_fish_max) {
                    increment_large_fish();
                    decrement_worms();
                    decrement_guppies();
                    decrement_small_fish();

                    return;
                }
            }
        } else if (get_random(1, 100) < medium_fish_chance) {
            if (caught_small_fish) {
                if (medium_fish_count < medium_fish_max) {
                    increment_medium_fish();
                    decrement_worms();
                    decrement_guppies();

                    return;
                }
            }
        } else if (get_random(1, 100) < small_fish_chance) {
            let decrement = true;

            // 50% chance to get a guppy instead of small fish
            if (get_random(1, 2) == 1 && caught_small_fish) {
                if (guppy_count < guppy_max) {
                    increment_guppies();

                    decrement = true;
                }
            } else {
                if (small_fish_count < small_fish_max) {
                    increment_small_fish();

                    decrement = true;
                }
            }

            if (decrement && worm_count > 0) {
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

function show_max_count(element_name, value) {
    document.getElementById(element_name).style.opacity = 0.5;

    let max = document.getElementById(element_name + "_max");
    max.innerText = "/" + value.toString();
    max.classList.remove("hidden");
    max.style.opacity = 0.5;
}

function increment_worms() {
    // if this is the first time you find a worm, unlock fishing and show worm count
    if (!found_worms) {
        document.getElementById("worms").classList.remove("hidden");
        document.getElementById("fishing_buttons").classList.remove("hidden");

        found_worms = true;
    }

    // get a random amount of worms between 1-3
    if ((worm_count += get_random(1, 3)) >= worm_max) {
        worm_count = worm_max;

        show_max_count("worm_count", worm_max);
    }
    document.getElementById("worm_count").innerText = worm_count;

    write_message("worms writhing in the mud can be used as bait");
}

function decrement_worms() {
    let element = document.getElementById("worm_count");
    element.innerText = --worm_count;
    element.style.opacity = 1.0;
    document.getElementById("worm_count_max").style.opacity = 1.0;
}

function increment_guppies() {
    document.getElementById("guppy_count").innerText = ++guppy_count;

    if (guppy_count == guppy_max) {
        document.getElementById("guppy_max_count").innerText = "/" + guppy_max.toString();
    }

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

    write_message("quite the impressive catch; it looks to have been a fighter");
}