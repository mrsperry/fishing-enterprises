var fishing = {
    state: function(fish) {
        this.is_fishing = false;

        this.cast_out_message = false;
        this.reel_in_message = false;

        this.fish = fish;

        $("<div>")
            .attr("id", "fishing_buttons")
            .appendTo($("#resource_buttons"));
        buttons.create({
            parent: "fishing_buttons",
            id: "cast_out_line",
            text: "Cast out line",
            on_click: function() {
                fishing.toggle_state(locations.current_area.state);
            }
        });
        buttons.create({
            parent: "fishing_buttons",
            id: "reel_in_line",
            text: "Reel in line",
            disabled: true,
            on_click: function() {
                fishing.toggle_state(locations.current_area.state);
            }
        });
    },

    update(state) {
        if (state.is_fishing) {
            // randomize fish order so chances aren't skewed
            for (let fish of main.shuffle(state.fish)) {
                // random chance to catch the fish
                if (main.random(1, 100) <= fish.chance) {
                    // make sure there is bait
                    let has_bait = true;
                    if (fish.bait != null) {
                        for (let bait of fish.bait) {
                            let count = resources.bait[bait.type].count;
                            if (bait.amount > (count == null ? 0 : count)) {
                                has_bait = false;
                                break;
                            }
                        }
                    }

                    // make sure there is tackle
                    let has_tackle = true;
                    if (fish.tackle != null) {
                        console.log(fish.tackle);
                        for (let tackle of fish.tackle) {
                            console.log(tackle);
                            let count = resources.tackle[tackle.type].count;
                            if (tackle.amount > (count == null ? 0 : count)) {
                                has_tackle = false;
                                break;
                            }
                        }
                    }

                    let has_fuel = true;
                    let use_fuel = false;
                    if (locations.current_area.ocean != null) {
                        has_fuel = resources.fuel.count > 0;
                        use_fuel = true;
                    }

                    // go on to the next fish if theres no bait or tackle for this one
                    if (!has_bait || !has_tackle || !has_fuel) {
                        continue;
                    }

                    // check prerequesite fish
                    if (resources.fish[fish.after] == null || resources.fish[fish.after].caught) {
                        // check if the fish should append to bait
                        if (fishing.catch(fish, resources.bait[fish.internal] == null ? false : true)) {
                            // subtract the bait
                            if (fish.bait != null) {
                                for (let bait of fish.bait) {
                                    resources.bait[bait.type].count -= bait.amount;
                                }
                            }
                            // subtract the tackle
                            if (fish.tackle != null) {
                                for (let tackle of fish.tackle) {
                                    resources.tackle[tackle.type].count -= tackle.amount;
                                }
                            }
                            // subtract the fuel
                            if (use_fuel) {
                                resources.fuel.count--;
                            }
                        }

                        return;
                    }
                }
            }
        }
    },

    unload(state) {
        if (state.is_fishing) {
            fishing.toggle_state(state);
        }
    },

    toggle_state(state) {
        $("#cast_out_line_button")
            .prop("disabled", !state.is_fishing);
        $("#reel_in_line_button")
            .prop("disabled", state.is_fishing);
        $("#forage_for_worms_button")
            .prop("disabled", !state.is_fishing);

        if (state.is_fishing && !state.reel_in_message) {
            messenger.write_message("reeling in your line is always full of tedium");
            state.reel_in_message = true;
        } else if (!state.cast_out_message) {
            messenger.write_message("you cast out your line as far as your arm permits");
            state.cast_out_message = true;
        }

        state.is_fishing = !state.is_fishing;
    },

    catch(fish, is_bait) {
        if (fish.caught == null) {
            if (!is_bait) {
                counters.create_counter(fish, locations.current_area.internal + "_counters");
            }

            $("#" + fish.internal)
                .fadeIn();
            
            if (fish.internal == "bass") {
                // show the fish counters if this is the first fish
                $("#fish_counters")
                    .fadeIn();
            } else if (fish.internal == "worms") {
                // show fishing buttons
                $("#fishing_buttons")
                    .fadeIn();
                // show the bait counters
                $("#bait_counters")
                    .fadeIn();
            }

            messenger.write_message(fish.display + ": " + fish.message);

            fish.caught = true;
        }

        if (fish.count == null) {
            fish.count = 0;
            fish.total = 0;
            fish.max_caught = fish.max_caught == null ? 1 : fish.max_caught;
        }

        if (fish.count != fish.max) {
            let amount = main.random(1, fish.max_caught);
            if (fish.count + amount >= fish.max) {
                fish.count = fish.max;
            } else {
                fish.count += amount;
            }
            fish.total += amount;

            // check this after so we don't display the message until after the max has been hit
            if (fish.count == fish.max) {
                // unlock the shop
                if (fish.internal != "worms" && fish.internal != "guppies") {
                    $("#shop_button")
                        .fadeIn();
                    $("#lake_button")
                        .fadeIn();
                }

                counters.show_max(fish);
            }
            
            counters.update();

            return true;
        } else {
            return false;
        }
    },
}